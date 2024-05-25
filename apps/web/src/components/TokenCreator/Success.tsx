import { Trans } from "@lingui/macro";
import ProxyLogo from "assets/images/Icon.png";
import useFetchLogo from "hooks/useFetchLogo";
import { useEffect, useState } from "react";
import { Copy } from "react-feather";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemedText } from "theme/components";

const StyledHeader = styled.div`
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
  text-align: center;
`;

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.surface2};
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.5rem;
`;

const CopyContainer = styled.div`
  background: ${({ theme }) => theme.surface3};
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem;
`;

const TokenLogo = styled.img`
  border-radius: 100%;
  border: 1.5px solid ${({ theme }) => theme.surface3};
`;

const Tooltip = styled.span`
  position: relative;
  cursor: pointer;
`;

const TooltipText = styled.span`
  visibility: hidden;
  font-size: 12px;
  background-color: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.surface3};
  color: ${({ theme }) => theme.neutral1};
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);

  ${Tooltip}:hover & {
    visibility: visible;
  }
`;

export default function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);
  const [tokenTooltipVisible, setTokenTooltipVisible] = useState(false);
  const [transactionTooltipVisible, setTransactionTooltipVisible] =
    useState(false);

  const tickerName = queryParams.get("tickerName") || "";
  const tokenAddress = queryParams.get("tokenAddress") || "";
  const tokenLogo = queryParams.get("tokenLogo") || "";
  const transactionAddress = queryParams.get("transactionAddress") || "";
  const { logoUrl: logo } = useFetchLogo(tokenLogo);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncateAddress = (address: string) => {
    if (isSmallScreen) {
      return `${address.slice(0, 6)}....${address.slice(-4)}`;
    }
    return `${address.slice(0, 20)}....${address.slice(-11)}`;
  };

  const handleCopy = (
    address: string,
    setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    navigator.clipboard.writeText(address);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000);
  };

  const tokenLogoUrl = tokenLogo && logo ? logo : ProxyLogo;

  return (
    <>
      <StyledHeader>
        <ThemedText.BodySecondary fontWeight={700} fontSize={14}>
          <Trans>Success</Trans>
        </ThemedText.BodySecondary>
      </StyledHeader>
      <TokenContainer>
        <TokenLogo src={tokenLogoUrl} width={48} height={48} alt="Token Logo" />
      </TokenContainer>
      <StyledContainer>
        <StyledHeader as="div">
          <ThemedText.BodyPrimary fontWeight={600} fontSize={18}>
            <Trans>Congrats</Trans>
          </ThemedText.BodyPrimary>
          <ThemedText.BodySecondary
            fontWeight={400}
            fontSize={14}
            marginTop="6px"
          >
            <Trans>
              ${tickerName} is deployed, share contract address with your fam!
            </Trans>
          </ThemedText.BodySecondary>
        </StyledHeader>
        <ThemedText.BodySecondary
          fontWeight={500}
          fontSize={12}
          marginTop="1rem"
        >
          <Trans>${tickerName} address</Trans>
        </ThemedText.BodySecondary>
        <CopyContainer>
          <ThemedText.BodyPrimary fontWeight={600} fontSize={14}>
            <Trans>{truncateAddress(tokenAddress)}</Trans>
          </ThemedText.BodyPrimary>
          <Tooltip
            onClick={() => handleCopy(tokenAddress, setTokenTooltipVisible)}
          >
            <Copy size={16} cursor="pointer" />
            <TooltipText>
              {tokenTooltipVisible ? (
                <Trans>Copied!</Trans>
              ) : (
                <Trans>Copy</Trans>
              )}
            </TooltipText>
          </Tooltip>
        </CopyContainer>
        <ThemedText.BodySecondary
          fontWeight={500}
          fontSize={12}
          marginTop="1rem"
        >
          <Trans>Deployment transaction</Trans>
        </ThemedText.BodySecondary>
        <CopyContainer>
          <ThemedText.BodyPrimary fontWeight={600} fontSize={14}>
            <Trans>{truncateAddress(transactionAddress)}</Trans>
          </ThemedText.BodyPrimary>
          <Tooltip
            onClick={() =>
              handleCopy(transactionAddress, setTransactionTooltipVisible)
            }
          >
            <Copy size={16} cursor="pointer" />
            <TooltipText>
              {transactionTooltipVisible ? (
                <Trans>Copied!</Trans>
              ) : (
                <Trans>Copy</Trans>
              )}
            </TooltipText>
          </Tooltip>
        </CopyContainer>
      </StyledContainer>
    </>
  );
}
