import { Trans } from '@lingui/macro'
import { RowBetween, RowFixed } from 'components/Row'
import { ChevronDown } from 'react-feather'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

interface LockTokenProps {
  review?: boolean
}

const StyledContainer = styled.div`
  background: #1f1f1f;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
  margin-top: 12px;
`

const StyledDropDown = styled.div`
  width: 100%;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
  color: white;
  outline: none;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`

export default function LockToken({ review }: LockTokenProps) {
  return (
    <StyledContainer>
      <RowBetween>
        <RowFixed>
          <ThemedText.Black fontWeight={600} fontSize={26}>
            <Trans>723.93</Trans>
          </ThemedText.Black>
        </RowFixed>
        <RowFixed>
          <StyledDropDown>
            <img src="/images/proxyswap-icon.svg" width={16} height={16} alt="Proxyswap icon" />
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans>PROXY</Trans>
            </ThemedText.Black>
            {review ? '' : <ChevronDown size="16" />}
          </StyledDropDown>
        </RowFixed>
      </RowBetween>
      <RowBetween style={{ marginTop: '12px' }}>
        <RowFixed>
          <ThemedText.DarkGray fontWeight={500} fontSize={14}>
            <Trans> $188.27</Trans>
          </ThemedText.DarkGray>
        </RowFixed>
        <RowFixed>
          <ThemedText.DarkGray fontWeight={500} fontSize={14}>
            <Trans>Balance: 0.067</Trans>
          </ThemedText.DarkGray>
        </RowFixed>
      </RowBetween>
    </StyledContainer>
  )
}
