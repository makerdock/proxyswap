import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { RowCenter } from 'components/Row'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledHeader = styled.div`
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

const StyledStepsContainer = styled.div`
  background: #1f1f1f;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.5rem;
`
const StyledStepsInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`

export default function CreateToken() {
  return (
    <>
      <StyledHeader>
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>Create your own token</Trans>
          </ThemedText.Main>
        </RowCenter>
      </StyledHeader>
      <StyledStepsContainer>
        <StyledHeader style={{ paddingTop: 0, paddingLeft: 0 }}>
          <ThemedText.Black fontWeight={600} fontSize={14}>
            <Trans>Steps</Trans>
          </ThemedText.Black>
        </StyledHeader>
        <StyledStepsInnerContainer>
          <ThemedText.Main fontWeight={500} fontSize={16}>
            <Trans>1. Add basic info like name, ticker & logo</Trans>
          </ThemedText.Main>
          <ThemedText.Main fontWeight={500} fontSize={16}>
            <Trans>2. Add economics like token supply, whitelist address, etc</Trans>
          </ThemedText.Main>
          <ThemedText.Main fontWeight={500} fontSize={16}>
            <Trans>3. Confirm the data, and launch</Trans>
          </ThemedText.Main>
        </StyledStepsInnerContainer>
      </StyledStepsContainer>
      <ButtonPrimary as={Link} to={`/launch/step1`}>
        <ThemedText.Black fontWeight={700} fontSize={16}>
          <Trans>Continue</Trans>
        </ThemedText.Black>
      </ButtonPrimary>
    </>
  )
}
