import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { RowCenter } from 'components/Row'
import { ChangeEvent, useState } from 'react'
import { ArrowLeft, Upload } from 'react-feather'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Separator, ThemedText } from 'theme'

const StyledHeader = styled.div`
  position: relative;
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
`

const CSVInput = styled.input`
  display: none;
`

const CSVLabel = styled.label`
  width: 100%;
  height: 112px;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.07);
  cursor: pointer;
  background: #1f1f1f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: auto;
`

const TableHeader = styled.th`
  padding: 8px 16px 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const TableCell = styled.td`
  padding: 12px 16px 12px 16px;
  text-align: left;

  &:last-child {
    text-align: right;
    font-size: 12px;
    opacity: 0.48;
  }
`

const GoBack = styled(Link)`
  margin-right: auto;
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
`

const AirdropContainer = styled.div`
  border-radius: 12px;
  background: #1f1f1f;
  border: 1px solid rgba(255, 255, 255, 0.07);
  margin-top: 12px;
  overflow: hidden;
`

export default function Step3() {
  const [csvData, setCSVData] = useState<string | null>(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const tokenName = queryParams.get('tokenName') || ''
  const tickerName = queryParams.get('tickerName') || ''
  const tokenQuantity = queryParams.get('tokenQuantity') || ''
  const logo = queryParams.get('logo') || null

  const parseCSV = () => {
    if (!csvData) return null
    const rows = csvData.trim().split('\n')
    const data = rows.map((row) => row.split(','))
    return { data }
  }

  const handleCSVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setCSVData(result)
      }
      reader.readAsText(file)
    }
  }

  const csvTable = parseCSV()

  const totalPercentage = csvTable?.data.reduce((total, rowData) => {
    const percentage = parseFloat(rowData[1])
    if (!isNaN(percentage)) {
      return total + percentage
    }
    return total
  }, 0)

  const disableButton = !!totalPercentage && totalPercentage >= 100

  return (
    <>
      <StyledHeader>
        <GoBack to="/launch/step1">
          <ArrowLeft size={16} />
        </GoBack>
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>Step 2/2</Trans>
          </ThemedText.Main>
        </RowCenter>
      </StyledHeader>
      <div style={{ padding: '12px', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ThemedText.Black fontWeight={500} fontSize={12} opacity={'0.76'}>
            <Trans>Add airdrop details</Trans>
          </ThemedText.Black>
          <ThemedText.Black
            fontWeight={500}
            fontSize={12}
            opacity={'0.76'}
            onClick={csvData ? () => setCSVData(null) : undefined}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            <Trans>{csvData ? 'Reset CSV' : 'Download CSV'}</Trans>
          </ThemedText.Black>
        </div>
        {csvData ? (
          <AirdropContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader style={{ textAlign: 'left' }}>
                    <ThemedText.Black fontWeight={600} fontSize={12} opacity={'0.48'}>
                      <Trans>Address</Trans>
                    </ThemedText.Black>
                  </TableHeader>
                  <TableHeader style={{ textAlign: 'right' }}>
                    <ThemedText.Black fontWeight={600} fontSize={12} opacity={'0.48'}>
                      <Trans>Percentage</Trans>
                    </ThemedText.Black>
                  </TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>
                    <ThemedText.Black fontWeight={600} fontSize={14}>
                      <Trans>You</Trans>
                    </ThemedText.Black>
                  </TableCell>
                  <TableCell>
                    <ThemedText.Black fontWeight={600} fontSize={14}>
                      <Trans>{totalPercentage && 100 - totalPercentage}%</Trans>
                    </ThemedText.Black>
                  </TableCell>
                </TableRow>
                {csvTable?.data.map((rowData, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <ThemedText.Black fontWeight={600} fontSize={14}>
                        {`${rowData[0].slice(0, 6)}....${rowData[0].slice(-4)}`}
                      </ThemedText.Black>
                    </TableCell>
                    <TableCell>
                      <ThemedText.Black fontWeight={600} fontSize={14}>
                        <Trans>{rowData[1]}</Trans>
                      </ThemedText.Black>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </AirdropContainer>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px', marginBottom: '10rem' }}>
            <CSVLabel htmlFor="csv">
              <Upload size={20} opacity={0.5} />
              <ThemedText.Black fontWeight={400} fontSize={12} opacity="0.48" lineHeight="130%" textAlign="center">
                <Trans>
                  Click and Select
                  <br />
                  the CSV file
                </Trans>
              </ThemedText.Black>
            </CSVLabel>
            <CSVInput type="file" name="csv" accept=".csv" id="csv" onChange={handleCSVChange} />
          </div>
        )}
      </div>
      <Separator />
      <Link
        to={
          csvData && !disableButton
            ? `/launch/confirmation?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                tickerName
              )}&tokenQuantity=${encodeURIComponent(tokenQuantity)}&logo=${logo || ''}&csvData=${encodeURIComponent(
                csvData
              )}`
            : ''
        }
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          if (!csvData || disableButton) {
            e.preventDefault()
          }
        }}
      >
        <ButtonPrimary disabled={!csvData || disableButton} marginTop={'0.5rem'}>
          <ThemedText.Black fontWeight={700} fontSize={16}>
            <Trans>{disableButton ? 'Percentage is more than 100' : 'Continue'}</Trans>
          </ThemedText.Black>
        </ButtonPrimary>
      </Link>
    </>
  )
}
