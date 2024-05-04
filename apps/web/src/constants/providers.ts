import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { ChainId } from "@uniswap/sdk-core";

import { CHAIN_IDS_TO_NAMES, SupportedInterfaceChain } from "./chains";
import { RPC_URLS } from "./networks";

const providerFactory = (chainId: SupportedInterfaceChain, i = 0) =>
  // Including networkish allows ethers to skip the initial detectNetwork call.
  new StaticJsonRpcProvider(
    RPC_URLS[chainId][i],
    /* networkish= */ { chainId, name: CHAIN_IDS_TO_NAMES[chainId] },
  );

/**
 * These are the only JsonRpcProviders used directly by the interface.
 */
export const RPC_PROVIDERS: {
  [key in SupportedInterfaceChain]: StaticJsonRpcProvider;
} = {
  [ChainId.DEGEN]: providerFactory(ChainId.DEGEN),
};

export const DEPRECATED_RPC_PROVIDERS: {
  [key in SupportedInterfaceChain]: StaticJsonRpcProvider;
} = {
  [ChainId.DEGEN]: providerFactory(ChainId.DEGEN),
};
