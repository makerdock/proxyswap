import { Trans } from '@lingui/macro'
import { PageName } from 'components/AmplitudeAnalytics/constants'
import { Trace } from 'components/AmplitudeAnalytics/Trace'
import TablePools from 'components/Lock/TablePools'
import TableTokens from 'components/Lock/TableTokens'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const StyledContainer = styled.div`
  width: 100%;
  padding: 0 4rem;
`

export default function Lock() {
  const [showTokens, setShowTokens] = useState(true)
  return (
    <Trace page={PageName.LOCK_PAGE} shouldLogImpression>
      <StyledContainer>
        <StyledButton onClick={() => setShowTokens(true)}>
          <ThemedText.Black fontWeight={600} fontSize={18} opacity={showTokens ? '100%' : '50%'}>
            <Trans>Tokens</Trans>
          </ThemedText.Black>
        </StyledButton>
        <StyledButton onClick={() => setShowTokens(false)}>
          <ThemedText.Black fontWeight={600} fontSize={18} opacity={showTokens ? '50%' : '100%'}>
            <Trans>Pools</Trans>
          </ThemedText.Black>
        </StyledButton>
        {showTokens ? <TableTokens /> : <TablePools />}
      </StyledContainer>
    </Trace>
  )
}
