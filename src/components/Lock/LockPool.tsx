import { Trans } from '@lingui/macro'
import { RowBetween, RowFixed } from 'components/Row'
import { ArrowUpRight } from 'react-feather'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledContainer = styled.div`
  background: #1f1f1f;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
  margin-top: 12px;
`

const StyledTokenContainer = styled.div`
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  width: 100%;
  flex-grow: 1;
  padding: 12px;
`

const StyledTokenInnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 4px;
`

export default function LockPool() {
  return (
    <StyledContainer>
      <RowBetween>
        <RowFixed>
          <ThemedText.Black fontWeight={600} fontSize={14}>
            <Trans>Pool</Trans>
          </ThemedText.Black>
        </RowFixed>
        <RowFixed>
          <ThemedText.Black fontWeight={600} fontSize={22}>
            <Trans>$723.93</Trans>
          </ThemedText.Black>
        </RowFixed>
      </RowBetween>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <StyledTokenContainer>
          <StyledTokenInnerContainer>
            <img src="/images/proxyswap-icon.svg" width={16} height={16} alt="Proxyswap icon" />
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans>PROXY</Trans>
            </ThemedText.Black>
            <ArrowUpRight size="16" />
          </StyledTokenInnerContainer>
          <RowBetween>
            <RowFixed>
              <ThemedText.Main fontWeight={600} fontSize={12}>
                <Trans> 39,041.00</Trans>
              </ThemedText.Main>
            </RowFixed>
            <RowFixed>
              <ThemedText.Main fontWeight={600} fontSize={12}>
                <Trans>69%</Trans>
              </ThemedText.Main>
            </RowFixed>
          </RowBetween>
        </StyledTokenContainer>
        <StyledTokenContainer>
          <StyledTokenInnerContainer>
            <img src="/images/degen-icon.svg" width={16} height={16} alt="Degen icon" />
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans>DEGEN</Trans>
            </ThemedText.Black>
            <ArrowUpRight size="16" />
          </StyledTokenInnerContainer>
          <RowBetween>
            <RowFixed>
              <ThemedText.Main fontWeight={600} fontSize={12}>
                <Trans> 39,041.00</Trans>
              </ThemedText.Main>
            </RowFixed>
            <RowFixed>
              <ThemedText.Main fontWeight={600} fontSize={12}>
                <Trans>31%</Trans>
              </ThemedText.Main>
            </RowFixed>
          </RowBetween>
        </StyledTokenContainer>
      </div>
    </StyledContainer>
  )
}
