import { Trans } from '@lingui/macro'
import { RowBetween, RowCenter, RowFixed } from 'components/Row'
import { ArrowLeft } from 'react-feather'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

interface LockHeaderProps {
  token?: boolean
}

const StyledLockHeader = styled.div`
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

export default function LockHeader({ token }: LockHeaderProps) {
  return (
    <StyledLockHeader>
      <RowBetween>
        <RowFixed>
          <ArrowLeft size="16" onClick={() => console.log('arrow clicked')} />
        </RowFixed>
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>{token ? 'Lock Token' : 'Lock LP NFT'}</Trans>
          </ThemedText.Main>
        </RowCenter>
      </RowBetween>
    </StyledLockHeader>
  )
}
