import { Trans } from '@lingui/macro'
import ProxyLogo from 'assets/images/Icon.png'
import { ButtonPrimary } from 'components/Button'
import { RowCenter } from 'components/Row'
import { useEffect, useState } from 'react'
import { Copy } from 'react-feather'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Separator, ThemedText } from 'theme'

const StyledHeader = styled.div`
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

const StyledContainer = styled.div`
  background: #1f1f1f;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.5rem;
`

const CopyContainer = styled.div`
  background: #292929;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
`

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem;
`

const TokenLogo = styled.img`
  border-radius: 100%;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
`

export default function Success() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const tickerName = queryParams.get('tickerName') || ''
  const tokenAddress = queryParams.get('tokenAddress') || ''
  const tokenLogo = queryParams.get('tokenLogo') || ''
  const transactionAddress = queryParams.get('transactionAddress') || ''

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 500)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  const truncatedTokenAddress = isSmallScreen
    ? `${tokenAddress.slice(0, 6)}....${tokenAddress.slice(-4)}`
    : tokenAddress

  const truncatedTransactionAddress = isSmallScreen
    ? `${transactionAddress.slice(0, 6)}....${transactionAddress.slice(-4)}`
    : `${transactionAddress.slice(0, 30)}....${transactionAddress.slice(-11)}`

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  return (
    <>
      <StyledHeader>
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>Success</Trans>
          </ThemedText.Main>
        </RowCenter>
      </StyledHeader>
      <TokenContainer>
        <TokenLogo src={ProxyLogo} width={48} height={48} alt="Token Logo" />
      </TokenContainer>
      <StyledContainer>
        <StyledHeader style={{ paddingTop: 0 }}>
          <RowCenter>
            <ThemedText.Black fontWeight={600} fontSize={18}>
              <Trans>Congrats</Trans>
            </ThemedText.Black>
          </RowCenter>
          <RowCenter>
            <ThemedText.Main fontWeight={400} fontSize={14} marginTop={'6px'} textAlign={'center'}>
              <Trans>${tickerName} is deployed, share contract address with your fam!</Trans>
            </ThemedText.Main>
          </RowCenter>
        </StyledHeader>
        <ThemedText.Main fontWeight={500} fontSize={12} marginTop={'1rem'}>
          <Trans>${tickerName} address</Trans>
        </ThemedText.Main>
        <CopyContainer>
          <ThemedText.Black fontWeight={600} fontSize={14}>
            <Trans>{truncatedTokenAddress}</Trans>
          </ThemedText.Black>
          <Copy size={16} onClick={() => handleCopy(tokenAddress)} cursor={'pointer'} />
        </CopyContainer>
        <ThemedText.Main fontWeight={500} fontSize={12} marginTop={'1rem'}>
          <Trans>Deployement transaction</Trans>
        </ThemedText.Main>
        <CopyContainer>
          <ThemedText.Black fontWeight={600} fontSize={14}>
            <Trans>{truncatedTransactionAddress}</Trans>
          </ThemedText.Black>
          <Copy size={16} onClick={() => handleCopy(transactionAddress)} cursor={'pointer'} />
        </CopyContainer>
      </StyledContainer>
      <Separator />
      <a
        href={`https://www.proxyswap.tips/#/add/ETH/${tokenAddress}?chain=degen`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ButtonPrimary marginTop={'0.5rem'}>
          <ThemedText.Black fontWeight={700} fontSize={16}>
            <Trans>Check ${tickerName} Market</Trans>
          </ThemedText.Black>
        </ButtonPrimary>
      </a>
    </>
  )
}
