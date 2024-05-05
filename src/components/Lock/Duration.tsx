import { Trans } from '@lingui/macro'
import { RowBetween } from 'components/Row'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledInput = styled.input`
  max-width: 80px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
  color: white;
  outline: none;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const StyledDurationDiv = styled.div`
  background: #1f1f1f;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px;
  margin-bottom: 8px;
`

export default function Duration() {
  return (
    <StyledDurationDiv>
      <ThemedText.Black fontWeight={600} fontSize={14}>
        <Trans>Enter duration</Trans>
      </ThemedText.Black>
      <RowBetween marginTop="16px">
        <StyledLabel htmlFor="year">
          <StyledInput type="number" min="0" id="year" value="1" />
          <ThemedText.DarkGray fontWeight={500} fontSize={14}>
            <Trans>Year</Trans>
          </ThemedText.DarkGray>
        </StyledLabel>
        <StyledLabel htmlFor="month">
          <StyledInput type="number" min="0" id="month" max="11" value="1" />
          <ThemedText.DarkGray fontWeight={500} fontSize={14}>
            <Trans>Months</Trans>
          </ThemedText.DarkGray>
        </StyledLabel>
        <StyledLabel htmlFor="day">
          <StyledInput type="number" min="0" id="day" max="31" value="1" />
          <ThemedText.DarkGray fontWeight={500} fontSize={14}>
            <Trans>Days</Trans>
          </ThemedText.DarkGray>
        </StyledLabel>
      </RowBetween>
    </StyledDurationDiv>
  )
}
