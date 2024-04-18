import { Currency } from '@uniswap/sdk-core'

import { DEGEN, nativeOnChain, WRAPPED_NATIVE_CURRENCY } from '../constants/tokens'
import { supportedChainId } from './supportedChainId'

export function unwrappedToken(currency: Currency): Currency {
  if (currency.isNative || currency.equals(DEGEN)) return currency
  const formattedChainId = supportedChainId(currency.chainId)
  if (formattedChainId && WRAPPED_NATIVE_CURRENCY[formattedChainId]?.equals(currency))
    return nativeOnChain(currency.chainId)
  return currency
}
