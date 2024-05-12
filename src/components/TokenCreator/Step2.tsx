import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { RowCenter } from 'components/Row'
import { ArrowLeft } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Separator, ThemedText } from 'theme'

const StyledHeader = styled.div`
  padding: 0.75rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
`

const StyledContainer = styled.div`
  background: #1f1f1f;
  border-radius: 16px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
const LPDepositContainer = styled.div`
  background: transparent;
  border-radius: 16px;
  padding: 0.75rem;
  margin: 4px 0;
  border: 1px solid rgba(255, 255, 255, 0.07);
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`

export default function Step2() {
  return (
    <>
      <StyledHeader>
        <ArrowLeft size={16} />
        <RowCenter>
          <ThemedText.Main fontWeight={700} fontSize={14}>
            <Trans>Step 2/3</Trans>
          </ThemedText.Main>
        </RowCenter>
      </StyledHeader>
      <div style={{ padding: '12px', marginTop: '12px', marginBottom: '8px' }}>
        <ThemedText.Black fontWeight={500} fontSize={12} opacity={'0.76'}>
          <Trans>Token quantity</Trans>
        </ThemedText.Black>
        <Input>
          <input placeholder="1000000" style={{ background: 'none', border: 'none', padding: 0 }} />
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button>
              <Trans>1M</Trans>
            </Button>
            <Button>
              <Trans>1B</Trans>
            </Button>
          </div>
        </Input>
        {/* <ThemedText.Black fontWeight={500} fontSize={12} opacity={'0.76'} marginTop={'16px'}>
          <Trans>Token price</Trans>
        </ThemedText.Black> */}
        {/* <LPDepositContainer>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div>
              <ThemedText.Black fontWeight={500} fontSize={12} opacity={'0.76'}>
                <Trans>Token&apos;s supply</Trans>
              </ThemedText.Black>
              <Input>
                <input placeholder="10%" style={{ background: 'none', border: 'none', padding: 0, width: '60%' }} />
                <Button>
                  <Trans>Max</Trans>
                </Button>
              </Input>
            </div>
            <div>
              <ThemedText.Black fontWeight={500} fontSize={12} opacity={'0.76'}>
                <Trans>Deposit DEGEN</Trans>
              </ThemedText.Black>
              <Input>
                <input placeholder="1000000" style={{ background: 'none', border: 'none', padding: 0, width: '60%' }} />
                <Button>
                  <Trans>Max</Trans>
                </Button>
              </Input>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            // value="50"
            style={{ width: '100%', marginTop: '12px', padding: '12px 0' }}
          />
        </LPDepositContainer> */}
        <StyledContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>Intial token price</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={18}>
              <Trans>$0.000003434</Trans>
            </ThemedText.Black>
          </DetailContainer>
          <Separator />
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>Price of DEGEN</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans>$0.023</Trans>
            </ThemedText.Black>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.Black fontWeight={500} fontSize={14} opacity={'0.3'}>
              <Trans>21.3k DEGEN/5.04m $yoo</Trans>
            </ThemedText.Black>
            <ThemedText.Black fontWeight={600} fontSize={14}>
              <Trans>0.0003434 DEGEN</Trans>
            </ThemedText.Black>
          </DetailContainer>
        </StyledContainer>
      </div>
      <Separator />

      <Link
        to={true ? '/launch/step3' : ''}
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          if (!true) {
            e.preventDefault()
          }
        }}
      >
        <ButtonPrimary disabled={!true} marginTop={'0.5rem'}>
          <ThemedText.Black fontWeight={700} fontSize={16}>
            <Trans>Continue</Trans>
          </ThemedText.Black>
        </ButtonPrimary>
      </Link>
    </>
  )
}
