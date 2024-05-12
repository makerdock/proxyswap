import { Contract } from '@ethersproject/contracts'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import TOKEN_CREATOR_ABI from 'abis/token-creator.json'
import { ButtonPrimary } from 'components/Button'
import { RowCenter } from 'components/Row'
import { defaultAbiCoder } from 'ethers/lib/utils'
import { ArrowLeft } from 'react-feather'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Separator, ThemedText } from 'theme'

const StyledHeader = styled.div`
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
`

const StyledOuterContainer = styled.div`
  padding: 0.75rem;
  margin-top: 0.75rem;
`

const StyledContainer = styled.div`
  background: #1f1f1f;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 4px;
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Confirmation() {
  const history = useHistory()
  const { provider } = useWeb3React()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const tokenName = queryParams.get('tokenName') || ''
  const tokenLogo = queryParams.get('logo') || ''
  const tickerName = queryParams.get('tickerName') || ''
  const tokenQuantity = queryParams.get('tokenQuantity') || ''
  const csvData = queryParams.get('csvData') || ''

  const parseCSV = (csvString: string) => {
    const rows = csvString.trim().split('\n')
    return rows.map((row) => row.split(','))
  }

  const tokenDistribution = parseCSV(csvData)

  const totalPercentage = tokenDistribution.reduce((total, rowData) => {
    const percentage = parseFloat(rowData[1])
    if (!isNaN(percentage)) {
      return total + percentage
    }
    return total
  }, 0)

  const signer = provider?.getSigner()
  const contractAddress = '0xEAb33cDde899F1919008f4259c9fbF14D68f225C'
  const maxSupply = parseInt(tokenQuantity) * (10 ^ 18)
  const recipients = tokenDistribution.map((rowData) => rowData[0])
  const amounts = tokenDistribution.map((rowData) => {
    const percentage = parseFloat(rowData[1])
    const amount = parseInt(tokenQuantity) * percentage * 0.01 * (10 ^ 18)
    return amount
  })

  const handleConfirmTokenCreation = async () => {
    const tokenCreatorContract = new Contract(contractAddress, TOKEN_CREATOR_ABI, signer)
    const tx = await tokenCreatorContract.deploy(tokenName, tickerName, maxSupply, recipients, amounts)
    const token = await tx.wait()
    const { logs } = token
    const tokenCreationLog = logs[logs.length - 1]
    const { topics } = tokenCreationLog
    const tokenAddressWithZeros = topics[1]
    const tokenAddress = defaultAbiCoder.decode(['address'], tokenAddressWithZeros)
    history.push(
      `/launch/success?tokenAddress=${tokenAddress}&tickerName=${tickerName}&tokenLogo=${encodeURIComponent(
        tokenLogo
      )}&transactionAddress=${tx.hash}`
    )
  }

  return (
    <>
      <StyledHeader>
        <Link style={{ marginRight: 'auto', position: 'absolute', color: 'rgba(255, 255, 255, 0.7' }} to="/step3">
          <ArrowLeft size={16} />
        </Link>
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>Confirmation</Trans>
          </ThemedText.Main>
        </RowCenter>
      </StyledHeader>
      <StyledOuterContainer>
        <ThemedText.Main fontWeight={500} fontSize={12}>
          <Trans>Confirm</Trans>
        </ThemedText.Main>
        <StyledContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>Token name</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans> {tokenName}</Trans>
            </ThemedText.Black>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>Ticker name</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans> ${tickerName}</Trans>
            </ThemedText.Black>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>Token quantity</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans> {tokenQuantity}</Trans>
            </ThemedText.Black>
          </DetailContainer>
        </StyledContainer>
        <ThemedText.Main fontWeight={500} fontSize={12} marginTop={'16px'}>
          <Trans>Token distribution</Trans>
        </ThemedText.Main>
        <StyledContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>You</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              {totalPercentage && 100 - totalPercentage}%
            </ThemedText.Black>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>Airdrop</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              {totalPercentage}%
            </ThemedText.Black>
          </DetailContainer>
        </StyledContainer>
      </StyledOuterContainer>
      <Separator />
      <ButtonPrimary marginTop={'0.5rem'} onClick={handleConfirmTokenCreation}>
        <ThemedText.Black fontWeight={700} fontSize={16}>
          <Trans> Confirm & deploy</Trans>
        </ThemedText.Black>
      </ButtonPrimary>
    </>
  )
}
