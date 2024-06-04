import { Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import { ButtonPrimary } from "components/Button";
import { useBalanceAndRate } from "hooks/useBalanceandRate";
import { ChangeEvent, useState } from "react";
import { ArrowLeft } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Separator, ThemedText } from "theme/components";

const GlobalStyle = createGlobalStyle`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`;

const StyledHeader = styled.div`
  position: relative;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.surface2};
  border-radius: 16px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LPDepositContainer = styled.div`
  background: transparent;
  border-radius: 16px;
  padding: 0.75rem;
  margin: 4px 0;
  border: 1px solid ${({ theme }) => theme.surface3};
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.div`
  background: ${({ theme }) => theme.surface2};
  border: none;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  outline: none;
  color: ${({ theme }) => theme.neutral1};
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.surface3};
  width: auto;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  color: ${({ theme }) => theme.neutral1};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;

const TokenQuantityInput = styled.input`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.neutral1};
  outline: none;
  width: 100%;
  font-family: "Inter", sans-serif;
`;

const GoBack = styled(Link)`
  margin-right: auto;
  position: absolute;
  color: ${({ theme }) => theme.neutral2};
  left: 5px;
`;

const OuterContainer = styled.div`
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const TokenSupplyInput = styled.input`
  background: none;
  border: none;
  padding: 0;
  width: 60%;
  color: ${({ theme }) => theme.neutral1};
  outline: none;
`;

const RangeInput = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 12px 0;
  cursor: pointer;
  outline: none;
`;

const BalanceButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const DepositInputContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 368px) {
    flex-direction: column;
  }
`;

const formatNumberWithAbbreviation = (number: number) => {
  const abbreviations: { [key: string]: number } = { b: 1e9, m: 1e6, k: 1e3 };
  for (const abbreviation in abbreviations) {
    if (number >= abbreviations[abbreviation]) {
      return `${(number / abbreviations[abbreviation]).toFixed(2)}${abbreviation}`;
    }
  }
  return number.toFixed(2);
};

export default function Step2() {
  const { account, provider } = useWeb3React();
  const { balance, rate } = useBalanceAndRate(account, provider);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [tokenQuantity, setTokenQuantity] = useState<string>(
    queryParams.get("tokenQuantity") || "",
  );
  const [tokenSupply, setTokenSupply] = useState<string>(
    queryParams.get("tokenSupply") + "%" || "10%",
  );
  const [degenAmount, setDegenAmount] = useState<string>(
    queryParams.get("degenAmount") || "",
  );

  const tickerName = queryParams.get("tickerName") || "";
  const tokenName = queryParams.get("tokenName") || "";
  const tokenLogo = queryParams.get("tokenLogo") || "";
  const logo = queryParams.get("logo") || "";
  const csvData = queryParams.get("csvData") || "";

  const formatTokenSupply = (value: string) => {
    if (!value.endsWith("%")) value += "%";
    return value;
  };

  const handleTokenSupplyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9.]/g, "");
    if (!filteredValue.includes(".") && filteredValue.length > 2) return;
    let formattedValue = formatTokenSupply(filteredValue);
    setTokenSupply(formattedValue);
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenSupply(formatTokenSupply(e.target.value));
  };

  const handleMaxTokenSupply = () => {
    setTokenSupply("97.5%");
  };

  const tokenSupplyQuantity =
    parseFloat(tokenSupply) * 0.01 * parseFloat(tokenQuantity);
  const priceOfDegen = parseFloat(degenAmount) * rate;
  const initialTokenPrice = priceOfDegen / tokenSupplyQuantity || 0;

  const degenInputError =
    degenAmount <= "0" || parseFloat(degenAmount) > parseFloat(balance);
  const tokenSupplyError = tokenSupply <= "0" || parseFloat(tokenSupply) > 97.5;
  const tokenQuantityError = tokenQuantity <= "0";

  return (
    <>
      <GlobalStyle />
      <StyledHeader>
        <GoBack
          to={`/launch/step1?tokenQuantity=${tokenQuantity}&tokenSupply=${tokenSupply.replace(
            "%",
            "",
          )}&degenAmount=${degenAmount}&tokenName=${tokenName}&tickerName=${tickerName}&tokenLogo=${tokenLogo}&initialTokenPrice=${initialTokenPrice}&logo=${logo}}&csvData=${encodeURIComponent(
            csvData,
          )}`}
        >
          <ArrowLeft size={16} />
        </GoBack>

        <ThemedText.BodySecondary
          fontWeight={700}
          fontSize={14}
          textAlign="center"
        >
          <Trans>Step 2/3</Trans>
        </ThemedText.BodySecondary>
      </StyledHeader>
      <OuterContainer>
        <label htmlFor="tokenQuantity">
          <ThemedText.BodySecondary fontWeight={500} fontSize={12}>
            <Trans>Token quantity</Trans>
          </ThemedText.BodySecondary>
          <Input>
            <TokenQuantityInput
              name="tokenQuantity"
              id="tokenQuantity"
              placeholder="1000000"
              min="0"
              type="number"
              onChange={(e) => setTokenQuantity(e.target.value)}
              value={tokenQuantity}
            />
            <BalanceButtons>
              <Button onClick={() => setTokenQuantity("1000000")}>
                <Trans>1M</Trans>
              </Button>
              <Button onClick={() => setTokenQuantity("1000000000")}>
                <Trans>1B</Trans>
              </Button>
            </BalanceButtons>
          </Input>
        </label>
        <ThemedText.BodySecondary
          fontWeight={500}
          fontSize={12}
          marginTop={"16px"}
        >
          <Trans>LP Deposit</Trans>
        </ThemedText.BodySecondary>
        <LPDepositContainer>
          <DepositInputContainer>
            <label htmlFor="tokenSupply">
              <ThemedText.BodySecondary fontWeight={500} fontSize={12}>
                <Trans>Token&apos;s supply</Trans>
              </ThemedText.BodySecondary>
              <Input>
                <TokenSupplyInput
                  placeholder="10%"
                  id="tokenSupply"
                  name="tokenSupply"
                  pattern="[0-9]*"
                  type="text"
                  value={tokenSupply}
                  onChange={handleTokenSupplyInputChange}
                />
                <Button onClick={handleMaxTokenSupply}>
                  <Trans>Max</Trans>
                </Button>
              </Input>
            </label>
            <label htmlFor="degenAmount">
              <ThemedText.BodySecondary fontWeight={500} fontSize={12}>
                <Trans>Deposit DEGEN</Trans>
              </ThemedText.BodySecondary>
              <Input>
                <TokenSupplyInput
                  id="degenAmount"
                  name="degenAmount"
                  placeholder="1000000"
                  min="0"
                  type="number"
                  value={degenAmount}
                  onChange={(e) => setDegenAmount(e.target.value)}
                />
                <Button onClick={() => setDegenAmount(balance)}>
                  <Trans>Max</Trans>
                </Button>
              </Input>
            </label>
          </DepositInputContainer>
          <RangeInput
            type="range"
            min="1"
            max="97.5"
            step="0.5"
            value={parseFloat(tokenSupply)}
            onChange={handleRangeChange}
          />
        </LPDepositContainer>
        <StyledContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Initial token price</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={600} fontSize={18}>
              ${isNaN(initialTokenPrice) ? 0 : initialTokenPrice.toFixed(9)}
            </ThemedText.BodyPrimary>
          </DetailContainer>
          <Separator />
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Price of DEGEN</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={600} fontSize={14}>
              <Trans>${rate?.toFixed(4)}</Trans>
            </ThemedText.BodyPrimary>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>
                {isNaN(parseFloat(degenAmount))
                  ? "0"
                  : formatNumberWithAbbreviation(parseFloat(degenAmount))}{" "}
                DEGEN /{" "}
                {isNaN(tokenSupplyQuantity)
                  ? "0"
                  : formatNumberWithAbbreviation(tokenSupplyQuantity)}{" "}
                ${tickerName}
              </Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary
              fontWeight={600}
              fontSize={14}
              textAlign="right"
            >
              <Trans>
                {isNaN(parseFloat(degenAmount) / tokenSupplyQuantity)
                  ? "0"
                  : (parseFloat(degenAmount) / tokenSupplyQuantity).toFixed(
                      6,
                    )}{" "}
                DEGEN
              </Trans>
            </ThemedText.BodyPrimary>
          </DetailContainer>
        </StyledContainer>
      </OuterContainer>
      <Separator />
      <Link
        to={
          !degenInputError && !tokenQuantityError && !tokenSupplyError
            ? `/launch/step3?tokenQuantity=${tokenQuantity}&tokenSupply=${tokenSupply.replace(
                "%",
                "",
              )}&degenAmount=${degenAmount}&tokenName=${tokenName}&tickerName=${tickerName}&tokenLogo=${tokenLogo}&initialTokenPrice=${initialTokenPrice}&logo=${logo}&csvData=${encodeURIComponent(
                csvData,
              )}`
            : ""
        }
        style={{ textDecoration: "none" }}
        onClick={(e) => {
          if (degenInputError || tokenQuantityError || tokenSupplyError) {
            e.preventDefault();
          }
        }}
      >
        <ButtonPrimary
          disabled={degenInputError || tokenQuantityError || tokenSupplyError}
          marginTop={"0.5rem"}
        >
          {parseFloat(degenAmount) > parseFloat(balance)
            ? "Insufficient DEGEN balance"
            : "Continue"}
        </ButtonPrimary>
      </Link>
    </>
  );
}
