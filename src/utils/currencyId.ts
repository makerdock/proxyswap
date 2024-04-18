import { Currency } from '@uniswap/sdk-core'
import { DEGEN } from 'constants/tokens'

export function currencyId(currency: Currency): string {
  if (currency.isNative || currency.equals(DEGEN)) return 'ETH'
  if (currency.isToken) return currency.address
  throw new Error('invalid currency')
}
