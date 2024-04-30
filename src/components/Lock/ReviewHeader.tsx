import { Trans } from '@lingui/macro'
import { RowBetween, RowFixed } from 'components/Row'
import styled from 'styled-components/macro'
import { CloseIcon, ThemedText } from 'theme'

const StyledReviewHeader = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

export default function ReviewHeader() {
  return (
    <StyledReviewHeader>
      <RowBetween>
        <ThemedText.Black fontWeight={700} fontSize={14}>
          <Trans>Review Lock</Trans>
        </ThemedText.Black>
        <RowFixed>
          <CloseIcon onClick={() => console.log('Modal close')} />
        </RowFixed>
      </RowBetween>
    </StyledReviewHeader>
  )
}
