import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledTableWrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  margin-top: 16px;
  overflow: hidden;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`
const StyledTableHeader = styled.thead`
  background: rgba(255, 255, 255, 0.07);
`

const StyledHeaderCell = styled.th`
  padding: 12px 16px;
`
const StyledDataCell = styled.td`
  padding: 12px 16px;
`

const StyledPercentageDiv = styled.div`
  width: 5rem;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.48);
  border-radius: 50px;
  overflow: hidden;
`

export default function TablePools() {
  const percentage = 50

  return (
    <StyledTableWrapper>
      <StyledTable>
        <StyledTableHeader>
          <tr>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>#</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Pool</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>TVL</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Pool Value</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell style={{ textAlign: 'right' }}>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Locking Period</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
          </tr>
        </StyledTableHeader>
        <tbody style={{ overflow: 'auto' }}>
          <tr>
            <StyledDataCell>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>1</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src="/images/proxyswap-icon.svg" width={14} height={14} alt="proxyswap icon" />
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>PROXY/DEGEN</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>$22.9M</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>23.34 PROXY</Trans>
              </ThemedText.Black>
              <StyledPercentageDiv>
                <div style={{ width: `${percentage}%`, height: '100%', background: '#0BABFB' }} />
              </StyledPercentageDiv>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>3445.34 DEGEN</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell style={{ textAlign: 'right' }}>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>7 Days left</Trans>
              </ThemedText.Black>
            </StyledDataCell>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTableWrapper>
  )
}
