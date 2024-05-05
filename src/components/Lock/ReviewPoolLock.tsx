import { Trans } from '@lingui/macro'
import { Trace } from 'components/AmplitudeAnalytics/Trace'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import AppBody from 'pages/AppBody'
import { useState } from 'react'
import { ThemedText } from 'theme'

import LockPool from './LockPool'
import Processing from './Processing'
import ReviewHeader from './ReviewHeader'
import ShowDuration from './ShowDuration'

export default function ReviewPoolLock() {
  const [startProcessing, setStartProcessing] = useState(false)
  return (
    <AppBody>
      <div style={{ margin: '16px' }}>
        <ReviewHeader />
        <AutoColumn gap={'sm'}>
          <Trace>
            <LockPool />
          </Trace>
          <Trace>
            <ShowDuration />
          </Trace>
        </AutoColumn>
        {startProcessing ? (
          <Processing />
        ) : (
          <>
            <ButtonPrimary onClick={() => console.log('hello')}>
              <Trans>Lock LP</Trans>
            </ButtonPrimary>
            <div style={{ margin: '0.75rem 0.5rem 0 0.5rem' }}>
              <RowBetween>
                <ThemedText.Main fontWeight={500} fontSize={14}>
                  <Trans>Network cost</Trans>
                </ThemedText.Main>
                <ThemedText.Main
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <img src="images/gas.svg" width={16} height={16} alt="gas icon" />
                  <Trans>$0.05</Trans>
                </ThemedText.Main>
              </RowBetween>
            </div>
          </>
        )}
      </div>
    </AppBody>
  )
}
