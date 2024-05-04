import { Trans } from '@lingui/macro'
import { ChainId } from '@uniswap/sdk-core'
import { useLimitsEnabled } from 'featureFlags/flags/limits'
import { useSendEnabled } from 'featureFlags/flags/send'
import { useSwapAndLimitContext, useSwapContext } from 'state/swap/SwapContext'
import styled from 'styled-components'
import { isIFramed } from 'utils/isIFramed'

import { useLocation } from 'react-router-dom'
import { RowBetween, RowFixed } from '../Row'
import SettingsTab from '../Settings'
import { SwapTab } from './constants'
import { SwapHeaderTabButton } from './styled'

const StyledSwapHeader = styled(RowBetween)`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.neutral2};
`

const HeaderButtonContainer = styled(RowFixed)`
  gap: 16px;
  padding-bottom: 8px;
`

export default function SwapHeader() {
  const limitsEnabled = useLimitsEnabled()
  const sendEnabled = useSendEnabled() && !isIFramed()
  const { chainId, currentTab, setCurrentTab } = useSwapAndLimitContext()
  const {
    derivedSwapInfo: { trade, autoSlippage },
  } = useSwapContext()
  const { pathname } = useLocation()

  // Limits is only available on mainnet for now
  if (chainId !== ChainId.MAINNET && currentTab === SwapTab.Limit) {
    setCurrentTab(SwapTab.Swap)
  }

  return (
    <StyledSwapHeader>
      <HeaderButtonContainer>
        <SwapHeaderTabButton
          as={pathname === '/swap' ? 'h1' : 'button'}
          role="button"
          tabIndex={0}
          $isActive={currentTab === SwapTab.Swap}
          onClick={() => setCurrentTab(SwapTab.Swap)}
          onKeyDown={(e: React.KeyboardEvent<HTMLHeadingElement | HTMLButtonElement>) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              e.preventDefault()
              setCurrentTab(SwapTab.Swap)
            }
          }}
        >
          <Trans>Swap</Trans>
        </SwapHeaderTabButton>
      </HeaderButtonContainer>
      <RowFixed>
        <SettingsTab autoSlippage={autoSlippage} chainId={chainId} trade={trade.trade} />
      </RowFixed>
    </StyledSwapHeader>
  )
}
