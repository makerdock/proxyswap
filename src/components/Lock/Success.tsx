import { Trans } from '@lingui/macro'
import { RowCenter } from 'components/Row'
import AppBody from 'pages/AppBody'
import styled from 'styled-components/macro'
import { CloseIcon, ThemedText } from 'theme'

interface SuccessProps {
  token?: boolean
}

const StyledLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
`

const StyledCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 4rem 2rem;
`

export default function Success({ token }: SuccessProps) {
  return (
    <AppBody>
      <div style={{ margin: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon onClick={() => console.log('Modal close')} />
        </div>
        <StyledCenterDiv>
          <img src="/images/tick.svg" width={64} height={64} alt="Success" />
          <ThemedText.Black fontWeight={500} fontSize={16}>
            <Trans>{token ? 'Token' : 'LP'} lock success!</Trans>
          </ThemedText.Black>
        </StyledCenterDiv>
        <RowCenter>
          <StyledLink href="lock#/lock">View on Explorer</StyledLink>
        </RowCenter>
      </div>
    </AppBody>
  )
}
