import { Trans } from '@lingui/macro'
import ImageUpload from 'assets/images/upload-image.svg'
import { ButtonPrimary } from 'components/Button'
import { RowCenter } from 'components/Row'
import { ChangeEvent, useState } from 'react'
import { ArrowLeft } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

const StyledHeader = styled.div`
  position: relative;
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
`
const StyledContainer = styled.div`
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

const StyledInput = styled.input`
  background: #1f1f1f;
  border: none;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  outline: none;
  color: white;
  margin-top: 4px;
`

const LogoInput = styled.input`
  display: none;
`

const LogoLabel = styled.label`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 1px dashed rgba(255, 255, 255, 0.07);
  cursor: pointer;
  background: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const Input = styled.div`
  background: #1f1f1f;
  border: none;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  outline: none;
  color: white;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  background: #333;
  width: auto;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  color: rgba(255, 255, 255, 0.76);
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`

const GoBack = styled(Link)`
  margin-right: auto;
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
`

const TokenQuantityInput = styled.input`
  background: none;
  border: none;
  padding: 0;
  color: white;
  outline: none;
`

export default function Step1() {
  const [logo, setLogo] = useState<string | null>(null)
  const [tokenName, setTokenName] = useState<string>('')
  const [tickerName, setTickerName] = useState<string>('')
  const [tokenQuantity, setTokenQuantity] = useState<string>('')

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogo(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const isInputsFilled =
    tokenName.trim() !== '' && tickerName.trim() !== '' && logo?.trim() !== '' && tokenQuantity.trim() !== ''

  return (
    <>
      <StyledHeader>
        <GoBack to="/launch">
          <ArrowLeft size={16} />
        </GoBack>
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>Step 1/2</Trans>
          </ThemedText.Main>
        </RowCenter>
      </StyledHeader>
      <StyledContainer>
        <label htmlFor="logo">
          <ThemedText.Main fontWeight={500} fontSize={12}>
            <Trans>Upload Logo</Trans>
          </ThemedText.Main>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
            <LogoLabel htmlFor="logo">
              {logo ? (
                <img src={logo} width="100%" height="100%" alt="Logo Preview" />
              ) : (
                <img src={ImageUpload} width={20} height={20} alt="Upload Icon" />
              )}
            </LogoLabel>
            <ThemedText.Black fontWeight={400} fontSize={12} opacity="0.48" lineHeight="130%">
              <Trans>
                Click and Select the <br />
                logo image( SVG, PNG & JPEG)
              </Trans>
            </ThemedText.Black>
            <LogoInput
              type="file"
              name="logo"
              accept="image/png, image/svg, image/jpeg"
              id="logo"
              onChange={handleLogoChange}
            />
          </div>
        </label>
        <label htmlFor="tokenName">
          <ThemedText.Main fontWeight={500} fontSize={12}>
            <Trans>Token name</Trans>
          </ThemedText.Main>
          <StyledInput
            name="tokenName"
            id="tokenName"
            placeholder="Enter token name"
            type="text"
            onChange={(e) => setTokenName(e.target.value)}
            value={tokenName}
          />
        </label>
        <label htmlFor="tickerName">
          <ThemedText.Main fontWeight={500} fontSize={12}>
            <Trans>Ticker name</Trans>
          </ThemedText.Main>
          <StyledInput
            name="tickerName"
            id="tickerName"
            placeholder="$Ticker"
            type="text"
            onChange={(e) => setTickerName(e.target.value)}
            value={tickerName}
          />
        </label>
        <label htmlFor="tokenQuanity">
          <ThemedText.Black fontWeight={500} fontSize={12} opacity={'0.76'}>
            <Trans>Token quantity</Trans>
          </ThemedText.Black>
          <Input>
            <TokenQuantityInput
              name="tokenQuantity"
              id="tokenQuantity"
              placeholder="1000000"
              type="number"
              onChange={(e) => setTokenQuantity(e.target.value)}
              value={tokenQuantity}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              <Button onClick={() => setTokenQuantity('1000000')}>
                <Trans>1M</Trans>
              </Button>
              <Button onClick={() => setTokenQuantity('1000000000')}>
                <Trans>1B</Trans>
              </Button>
            </div>
          </Input>
        </label>
      </StyledContainer>
      <Link
        to={
          isInputsFilled
            ? `/launch/step2?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                tickerName
              )}&tokenQuantity=${encodeURIComponent(tokenQuantity)}&logo=${encodeURIComponent(logo || '')}`
            : ''
        }
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          if (!isInputsFilled) {
            e.preventDefault()
          }
        }}
      >
        <ButtonPrimary disabled={!isInputsFilled}>
          <ThemedText.Black fontWeight={700} fontSize={16}>
            <Trans>Continue</Trans>
          </ThemedText.Black>
        </ButtonPrimary>
      </Link>
    </>
  )
}
