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
  text-align: right;
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

export default function TableTokens() {
  return (
    <StyledTableWrapper>
      <StyledTable>
        <StyledTableHeader>
          <tr>
            <StyledHeaderCell style={{ textAlign: 'left' }}>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>#</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell style={{ textAlign: 'left' }}>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Token Name</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Price</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Balance</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <ThemedText.Black fontWeight={600} fontSize={12}>
                <Trans>Locked</Trans>
              </ThemedText.Black>
            </StyledHeaderCell>
          </tr>
        </StyledTableHeader>
        <tbody>
          <tr>
            <StyledDataCell style={{ textAlign: 'left' }}>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>1</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src="/images/proxyswap-icon.svg" width={14} height={14} alt="proxyswap icon" />
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>
                  Proxy <span style={{ opacity: '32%' }}>PROXY</span>
                </Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>$22.2343</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>$4356.23</Trans>
              </ThemedText.Black>
            </StyledDataCell>
            <StyledDataCell>
              <ThemedText.Black fontWeight={500} fontSize={12}>
                <Trans>$4356.23</Trans>
              </ThemedText.Black>
            </StyledDataCell>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTableWrapper>
  )
}
