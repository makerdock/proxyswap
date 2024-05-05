import { Trans } from '@lingui/macro'
import { Trace } from 'components/AmplitudeAnalytics/Trace'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import AppBody from 'pages/AppBody'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

import Duration from './Duration'
import LockHeader from './LockHeader'
import LockPool from './LockPool'

const FooterWrapper = styled.div`
  margin-top: 0px;
  max-width: 460px;
  width: 100%;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
`

export default function LockPoolContainer() {
  return (
    <>
      <AppBody>
        <div style={{ margin: '8px' }}>
          <LockHeader />
          <AutoColumn gap={'sm'}>
            <Trace>
              <LockPool />
            </Trace>
            <Trace>
              <Duration />
            </Trace>
          </AutoColumn>
          <ButtonPrimary onClick={() => console.log('hello')}>
            <Trans>Preview</Trans>
          </ButtonPrimary>
        </div>
      </AppBody>
      <FooterWrapper>
        <RowBetween>
          <ThemedText.Main fontWeight={500} fontSize={14}>
            <Trans>Network cost</Trans>
          </ThemedText.Main>
          <ThemedText.Main fontWeight={500} fontSize={14} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img src="images/gas.svg" width={16} height={16} alt="gas icon" />
            <Trans>$0.05</Trans>
          </ThemedText.Main>
        </RowBetween>
      </FooterWrapper>
    </>
  )
}
