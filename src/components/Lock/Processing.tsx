import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

interface ProcessingProps {
  token?: boolean
}

const StyledContainer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
`

const StyledStepsContainer = styled.div`
  display: flex;
  gap: 12px;
`

export default function Processing({ token }: ProcessingProps) {
  return (
    <StyledContainer>
      <StyledStepsContainer>
        <img src="/images/processing-create.svg" width={22} height={16} alt="" />
        <ThemedText.Black fontSize={12} fontWeight={600}>
          <Trans>Create {token ? 'Token' : 'LP'} Lock</Trans>
        </ThemedText.Black>
      </StyledStepsContainer>
      <img src="/images/line.svg" width={22} height={14} alt="" style={{ margin: '4px 0', opacity: '30%' }} />
      <StyledStepsContainer style={{ opacity: '30%' }}>
        <img src="/images/processing-tick.svg" width={22} height={16} alt="" />
        <ThemedText.Black fontSize={12} fontWeight={600}>
          <Trans>Approve to spend {token ? 'Token' : 'LP'} Position</Trans>
        </ThemedText.Black>
      </StyledStepsContainer>
      <img src="/images/line.svg" width={22} height={14} alt="" style={{ margin: '4px 0', opacity: '30%' }} />
      <StyledStepsContainer style={{ opacity: '30%' }}>
        <img src="/images/transfer.svg" width={22} height={16} alt="" />
        <ThemedText.Black fontSize={12} fontWeight={600}>
          <Trans>Transfer {token ? 'Token' : 'LP'} to Safe</Trans>
        </ThemedText.Black>
      </StyledStepsContainer>
    </StyledContainer>
  )
}
