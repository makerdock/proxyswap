import { BigNumber } from '@ethersproject/bignumber'
import type { TransactionResponse } from '@ethersproject/providers'
import { LiquidityEventName } from '@uniswap/analytics-events'
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES, Percent } from '@uniswap/sdk-core'
import { FeeAmount, NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { sendAnalyticsEvent, useTrace } from 'analytics'
import usePrevious from 'hooks/usePrevious'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { BodyWrapper } from 'pages/AppBody'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
    useRangeHopCallbacks,
    useV3DerivedMintInfo,
    useV3MintActionHandlers
} from 'state/mint/v3/hooks'
import styled from 'styled-components'
import { addressesAreEquivalent } from 'utils/addressesAreEquivalent'
import { WrongChainError } from 'utils/errors'

import { ZERO_PERCENT } from '../constants/misc'
import { useCurrency } from '../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../hooks/useApproveCallback'
import { useArgentWalletContract } from '../hooks/useArgentWalletContract'
import { useV3NFTPositionManagerContract } from '../hooks/useContract'
import { useDerivedPositionInfo } from '../hooks/useDerivedPositionInfo'
import { useIsSwapUnsupported } from '../hooks/useIsSwapUnsupported'
import useTransactionDeadline from '../hooks/useTransactionDeadline'
import { useV3PositionFromTokenId } from '../hooks/useV3Positions'
import { Bound, Field } from '../state/mint/v3/actions'
import { useTransactionAdder } from '../state/transactions/hooks'
import { TransactionInfo, TransactionType } from '../state/transactions/types'
import { useUserSlippageToleranceWithDefault } from '../state/user/hooks'
import approveAmountCalldata from '../utils/approveAmountCalldata'
import { calculateGasMargin } from '../utils/calculateGasMargin'
import { currencyId } from '../utils/currencyId'

const DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10_000)

const StyledBodyWrapper = styled(BodyWrapper) <{ $hasExistingPosition: boolean }>`
  padding: ${({ $hasExistingPosition }) => ($hasExistingPosition ? '10px' : 0)};
  max-width: 640px;
`

type LiquidityPoolConfigType = {
    currencyIdA: string;
    currencyIdB: string;
    feeAmountFromUrl: string;
    minPrice: string;
    maxPrice: string;
}
export const liquidityPoolConfig: LiquidityPoolConfigType = {
    currencyIdA: "0xA051A2Cb19C00eCDffaE94D0Ff98c17758041D16",
    currencyIdB: "0x4c9436d7AaC04A40aca30ab101107081223D6e92",
    feeAmountFromUrl: '500',
    minPrice: "0.0000000000000000000000000000000000000029395",
    maxPrice: "340190000000000000000000000000000000000"
}

function useCreateLiquidityPool({ currencyIdA, currencyIdB, feeAmountFromUrl, maxPrice, minPrice }: LiquidityPoolConfigType) {
    const {
        tokenId,
    } = useParams<{
        currencyIdA?: string
        currencyIdB?: string
        feeAmount?: string
        tokenId?: string
    }>()

    const { account, chainId, provider } = useWeb3React()
    const trace = useTrace()

    const addTransaction = useTransactionAdder()
    const positionManager = useV3NFTPositionManagerContract()

    // check for existing position if tokenId in url
    const { position: existingPositionDetails, loading: positionLoading } = useV3PositionFromTokenId(
        tokenId ? BigNumber.from(tokenId) : undefined
    )
    const hasExistingPosition = !!existingPositionDetails && !positionLoading
    const { position: existingPosition } = useDerivedPositionInfo(existingPositionDetails)

    // fee selection from url
    const feeAmount: FeeAmount | undefined =
        feeAmountFromUrl && Object.values(FeeAmount).includes(parseFloat(feeAmountFromUrl))
            ? parseFloat(feeAmountFromUrl)
            : undefined

    const baseCurrency = useCurrency(currencyIdA)
    const currencyB = useCurrency(currencyIdB)
    // prevent an error if they input ETH/WETH
    const quoteCurrency =
        baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped) ? undefined : currencyB

    const {
        pool,
        ticks,
        parsedAmounts,
        position,
        noLiquidity,
        currencies,
        outOfRange,
    } = useV3DerivedMintInfo(
        baseCurrency ?? undefined,
        quoteCurrency ?? undefined,
        feeAmount,
        baseCurrency ?? undefined,
        existingPosition
    )

    const { onLeftRangeInput, onRightRangeInput } =
        useV3MintActionHandlers(noLiquidity)

    const deadline = useTransactionDeadline() // custom from users settings

    const argentWalletContract = useArgentWalletContract()

    const [approvalA, approveACallback] = useApproveCallback(
        argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_A],
        chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined
    )
    const [approvalB, approveBCallback] = useApproveCallback(
        argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_B],
        chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined
    )

    const allowedSlippage = useUserSlippageToleranceWithDefault(
        outOfRange ? ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE
    )

    const addIsUnsupported = useIsSwapUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)


    async function onAdd() {
        if (!chainId || !provider || !account) return

        if (!positionManager || !baseCurrency || !quoteCurrency) {
            return
        }
        if (showApprovalA) {
            await approveACallback()
        }
        if (showApprovalB) {
            await approveBCallback()
        }
        if (position && account && deadline) {
            const useNative = baseCurrency.isNative ? baseCurrency : quoteCurrency.isNative ? quoteCurrency : undefined
            const { calldata, value } =
                hasExistingPosition && tokenId
                    ? NonfungiblePositionManager.addCallParameters(position, {
                        tokenId,
                        slippageTolerance: allowedSlippage,
                        deadline: deadline.toString(),
                        useNative,
                    })
                    : NonfungiblePositionManager.addCallParameters(position, {
                        slippageTolerance: allowedSlippage,
                        recipient: account,
                        deadline: deadline.toString(),
                        useNative,
                        createPool: noLiquidity,
                    })

            let txn: { to: string; data: string; value: string } = {
                to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
                data: calldata,
                value,
            }

            if (argentWalletContract) {
                const amountA = parsedAmounts[Field.CURRENCY_A]
                const amountB = parsedAmounts[Field.CURRENCY_B]
                const batch = [
                    ...(amountA && amountA.currency.isToken
                        ? [approveAmountCalldata(amountA, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])]
                        : []),
                    ...(amountB && amountB.currency.isToken
                        ? [approveAmountCalldata(amountB, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])]
                        : []),
                    {
                        to: txn.to,
                        data: txn.data,
                        value: txn.value,
                    },
                ]
                const data = argentWalletContract.interface.encodeFunctionData('wc_multiCall', [batch])
                txn = {
                    to: argentWalletContract.address,
                    data,
                    value: '0x0',
                }
            }

            const connectedChainId = await provider.getSigner().getChainId()
            if (chainId !== connectedChainId) throw new WrongChainError()

            provider
                .getSigner()
                .estimateGas(txn)
                .then((estimate) => {
                    const newTxn = {
                        ...txn,
                        gasLimit: calculateGasMargin(estimate),
                    }

                    return provider
                        .getSigner()
                        .sendTransaction(newTxn)
                        .then((response: TransactionResponse) => {
                            const transactionInfo: TransactionInfo = {
                                type: TransactionType.ADD_LIQUIDITY_V3_POOL,
                                baseCurrencyId: currencyId(baseCurrency),
                                quoteCurrencyId: currencyId(quoteCurrency),
                                createPool: Boolean(noLiquidity),
                                expectedAmountBaseRaw: parsedAmounts[Field.CURRENCY_A]?.quotient?.toString() ?? '0',
                                expectedAmountQuoteRaw: parsedAmounts[Field.CURRENCY_B]?.quotient?.toString() ?? '0',
                                feeAmount: position.pool.fee,
                            }
                            addTransaction(response, transactionInfo)
                            sendAnalyticsEvent(LiquidityEventName.ADD_LIQUIDITY_SUBMITTED, {
                                label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/'),
                                ...trace,
                                ...transactionInfo,
                            })
                        })
                })
                .catch((error) => {
                    console.error('Failed to send transaction', error)
                    // we only care if the error is something _other_ than the user rejected the tx
                    if (error?.code !== 4001) {
                        console.error(error)
                    }
                })
        } else {
            return
        }
    }

    // get value and prices at ticks
    const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks

    const { getSetFullRange } =
        useRangeHopCallbacks(baseCurrency ?? undefined, quoteCurrency ?? undefined, feeAmount, tickLower, tickUpper, pool)

    // we need an existence check on parsed amounts for single-asset deposits
    const showApprovalA =
        !argentWalletContract && approvalA !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_A]
    const showApprovalB =
        !argentWalletContract && approvalB !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_B]

    const [searchParams, setSearchParams] = useSearchParams()

    // START: sync values with query string
    const oldSearchParams = usePrevious(searchParams)
    // use query string as an input to onInput handlers
    useEffect(() => {
        const oldMinPrice = oldSearchParams?.get('minPrice')
        if (
            minPrice &&
            typeof minPrice === 'string' &&
            !isNaN(minPrice as any) &&
            (!oldMinPrice || oldMinPrice !== minPrice)
        ) {
            onLeftRangeInput(minPrice)
        }
        // disable eslint rule because this hook only cares about the url->input state data flow
        // input state -> url updates are handled in the input handlers
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])
    useEffect(() => {
        const oldMaxPrice = oldSearchParams?.get('maxPrice')
        if (
            maxPrice &&
            typeof maxPrice === 'string' &&
            !isNaN(maxPrice as any) &&
            (!oldMaxPrice || oldMaxPrice !== maxPrice)
        ) {
            onRightRangeInput(maxPrice)
        }
        // disable eslint rule because this hook only cares about the url->input state data flow
        // input state -> url updates are handled in the input handlers
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])
    // END: sync values with query string

    const owner = useSingleCallResult(tokenId ? positionManager : null, 'ownerOf', [tokenId]).result?.[0]
    const ownsNFT =
        addressesAreEquivalent(owner, account) || addressesAreEquivalent(existingPositionDetails?.operator, account)
    const showOwnershipWarning = Boolean(hasExistingPosition && account && !ownsNFT)

    return {
        onAdd
    }
}


export default useCreateLiquidityPool