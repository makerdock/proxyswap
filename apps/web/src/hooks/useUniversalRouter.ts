import { BigNumber } from "@ethersproject/bignumber";
import { t } from "@lingui/macro";
import { Percent } from "@uniswap/sdk-core";
import { FlatFeeOptions, SwapRouter } from "@uniswap/universal-router-sdk";
import { FeeOptions, toHex } from "@uniswap/v3-sdk";
import { useWeb3React } from "@web3-react/core";
import { useTrace } from "analytics";
import { useCachedPortfolioBalancesQuery } from "components/PrefetchBalancesWrapper/PrefetchBalancesWrapper";
import useBlockNumber from "lib/hooks/useBlockNumber";
import { useCallback } from "react";
import { ClassicTrade, TradeFillType } from "state/routing/types";
import { useUserSlippageTolerance } from "state/user/hooks";
import { trace } from "tracing/trace";
import { UserRejectedRequestError, WrongChainError } from "utils/errors";
import isZero from "utils/isZero";
import {
  didUserReject,
  swapErrorToUserReadableMessage,
} from "utils/swapErrorToUserReadableMessage";

import { ethers } from "ethers";
import { PermitSignature } from "./usePermitAllowance";
import { UNIVERSAL_ROUTER_ADDRESS } from "utils/addresses";

/** Thrown when gas estimation fails. This class of error usually requires an emulator to determine the root cause. */
class GasEstimationError extends Error {
  constructor() {
    super(t`Your swap is expected to fail.`);
  }
}

/**
 * Thrown when the user modifies the transaction in-wallet before submitting it.
 * In-wallet calldata modification nullifies any safeguards (eg slippage) from the interface, so we recommend reverting them immediately.
 */
class ModifiedSwapError extends Error {
  constructor() {
    super(
      t`Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds.`
    );
  }
}

interface SwapOptions {
  slippageTolerance: Percent;
  deadline?: BigNumber;
  permit?: PermitSignature;
  feeOptions?: FeeOptions;
  flatFeeOptions?: FlatFeeOptions;
}

export function useUniversalRouterSwapCallback(
  trade: ClassicTrade | undefined,
  fiatValues: { amountIn?: number; amountOut?: number; feeUsd?: number },
  options: SwapOptions
) {
  const { account, chainId, provider, connector } = useWeb3React();
  const analyticsContext = useTrace();
  const blockNumber = useBlockNumber();
  const isAutoSlippage = useUserSlippageTolerance()[0] === "auto";
  const { data } = useCachedPortfolioBalancesQuery({ account });
  const portfolioBalanceUsd =
    data?.portfolios?.[0]?.tokensTotalDenominatedValue?.value;

  return useCallback(async () => {
    return trace(
      "swap.send",
      async ({ setTraceData, setTraceStatus, setTraceError }) => {
        try {
          if (!account) throw new Error("missing account");
          if (!chainId) throw new Error("missing chainId");
          if (!provider) throw new Error("missing provider");
          if (!trade) throw new Error("missing trade");
          const connectedChainId = await provider.getSigner().getChainId();
          if (chainId !== connectedChainId) throw new WrongChainError();

          setTraceData(
            "slippageTolerance",
            options.slippageTolerance.toFixed(2)
          );
          console.log(options.slippageTolerance.toFixed(2), "Slippage", trade);

          const { calldata: data, value } = SwapRouter.swapERC20CallParameters(
            trade,
            {
              slippageTolerance: options.slippageTolerance,
              deadlineOrPreviousBlockhash: options.deadline?.toString(),
              inputTokenPermit: options.permit,
              fee: options.feeOptions,
              flatFee: options.flatFeeOptions,
            }
          );
          debugger;
          const tx = {
            from: account,
            to: UNIVERSAL_ROUTER_ADDRESS,
            data,
            // TODO(https://github.com/Uniswap/universal-router-sdk/issues/113): universal-router-sdk returns a non-hexlified value.
            ...(value && !isZero(value) ? { value: toHex(value) } : {}),
          };
          const gasLimit = ethers.utils.parseUnits("5000000", "wei");
          setTraceData("gasLimit", gasLimit.toNumber());
          const response = await provider
            .getSigner()
            .sendTransaction({ ...tx, gasLimit })
            .then((response) => {
              if (tx.data !== response.data) {
                if (
                  !response.data ||
                  response.data.length === 0 ||
                  response.data === "0x"
                ) {
                  throw new ModifiedSwapError();
                }
              }
              return response;
            });
          return {
            type: TradeFillType.Classic as const,
            response,
          };
        } catch (swapError: unknown) {
          debugger;
          if (swapError instanceof ModifiedSwapError) throw swapError;

          // GasEstimationErrors are already traced when they are thrown.
          if (!(swapError instanceof GasEstimationError))
            setTraceError(swapError);

          // Cancellations are not failures, and must be accounted for as 'cancelled'.
          if (didUserReject(swapError)) {
            setTraceStatus("cancelled");
            // This error type allows us to distinguish between user rejections and other errors later too.
            throw new UserRejectedRequestError(
              swapErrorToUserReadableMessage(swapError)
            );
          }

          throw new Error(swapErrorToUserReadableMessage(swapError));
        }
      }
    );
  }, [
    account,
    chainId,
    provider,
    trade,
    options.slippageTolerance,
    options.deadline,
    options.permit,
    options.feeOptions,
    options.flatFeeOptions,
    analyticsContext,
    blockNumber,
    isAutoSlippage,
    fiatValues,
    portfolioBalanceUsd,
    connector,
  ]);
}
