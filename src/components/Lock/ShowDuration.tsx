import { Trans } from '@lingui/macro'
import { RowBetween } from 'components/Row'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledDurationDiv = styled.div`
  background: #1f1f1f;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
  margin-bottom: 8px;
`

export default function ShowDuration() {
  const noOfYear = '1'
  const noOfMonth = '2'
  const noOfDay = '6'

  return (
    <StyledDurationDiv>
      <RowBetween>
        <ThemedText.Black fontWeight={600} fontSize={12}>
          <Trans>Duration</Trans>
        </ThemedText.Black>
        <ThemedText.Black fontWeight={500} fontSize={14}>
          <Trans>
            {noOfYear} <span style={{ opacity: '76%', marginRight: '12px' }}>Year</span> {noOfMonth}{' '}
            <span style={{ opacity: '76%', marginRight: '12px' }}>Months</span> {noOfDay}{' '}
            <span style={{ opacity: '76%' }}>Days</span>
          </Trans>
        </ThemedText.Black>
      </RowBetween>
    </StyledDurationDiv>
  )
}
