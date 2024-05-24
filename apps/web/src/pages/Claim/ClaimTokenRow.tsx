import { Contract } from "@ethersproject/contracts";
import { Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import CLAIM_TOKEN_ABI from "wallet/src/abis/claim-token.json";
import ProxyIcon from "assets/images/Icon.png";
import useFetchLogo from "hooks/useFetchLogo";
import { TokenData } from "hooks/useFetchTokenData";
import { darken } from "polished";
import { useState } from "react";
import { Copy } from "react-feather";
import styled from "styled-components";
import { ThemedText } from "theme/components";
import Loader from "components/Icons/LoadingSpinner";

type ClaimTokenRowProps = {
  data: TokenData;
  index: number;
  setTokenData: React.Dispatch<React.SetStateAction<TokenData[]>>;
};

const StyledDataCell = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  border: none;
  font-size: 14px;
  font-weight: 600;
  width: 5rem;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.accent1};
  color: ${({ theme }) => theme.neutralContrast};
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.accent1)};
    background-color: ${({ theme }) => darken(0.05, theme.accent1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.accent1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.accent1)};
    background-color: ${({ theme }) => darken(0.1, theme.accent1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    pointer-events: none;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
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
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;

  position: absolute;
  z-index: 1;
  bottom: 125%;
  margin-left: -30px;

  ${Tooltip}:hover & {
    visibility: visible;
  }
`;

const Image = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 100%;
  border: 0.5px solid rgba(255, 255, 255, 0.12);
`;

export default function ClaimTokenRow({
  data,
  index,
  setTokenData,
}: ClaimTokenRowProps) {
  const { account, provider } = useWeb3React();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { logoUrl } = useFetchLogo(data.tokens.token_logo);
  const [loading, setLoading] = useState(false);

  const handleClaim = async (
    tokenAddress: string,
    amount: number,
    proofs: string[],
  ) => {
    try {
      setLoading(true);
      const signer = provider?.getSigner();
      const tokenContract = new Contract(tokenAddress, CLAIM_TOKEN_ABI, signer);
      const tx = await tokenContract.claimTokens(amount, proofs);
      await tx.wait();
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mark-token-claimed?address=${account}&tokenAddress=${tokenAddress}`,
        {
          method: "PUT",
        },
      );
      setTokenData((prevTokenData) =>
        prevTokenData.filter((token) => token.token_address !== tokenAddress),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000);
  };
  const tokenLogoUrl = data.tokens.token_logo && logoUrl ? logoUrl : ProxyIcon;

  return (
    <tr>
      <td>
        <StyledDataCell>
          <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
            <Trans>{index + 1}</Trans>
          </ThemedText.BodyPrimary>
        </StyledDataCell>
      </td>
      <td>
        <StyledDataCell>
          <Image src={tokenLogoUrl} alt="Token logo" />
          <div>
            <div
              style={{
                display: "flex",
                gap: "4px",
                marginBottom: "4px",
                alignItems: "center",
              }}
            >
              <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                <Trans>{data.tokens.token_name}</Trans>
              </ThemedText.BodyPrimary>
              <ThemedText.BodyPrimary
                fontWeight={500}
                fontSize={14}
                opacity="0.32"
              >
                <Trans>{data.tokens.ticker_name}</Trans>
              </ThemedText.BodyPrimary>
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <ThemedText.BodyPrimary
                fontWeight={500}
                fontSize={14}
                opacity="0.76"
              >
                <Trans>
                  {data.token_address.slice(0, 6)}...
                  {data.token_address.slice(-4)}
                </Trans>
              </ThemedText.BodyPrimary>
              <Tooltip onClick={() => handleCopy(data.token_address)}>
                <Copy size={12} cursor="pointer" opacity="0.76" />
                <TooltipText>
                  {tooltipVisible ? (
                    <Trans>Copied!</Trans>
                  ) : (
                    <Trans>Copy</Trans>
                  )}
                </TooltipText>
              </Tooltip>
            </div>
          </div>
        </StyledDataCell>
      </td>
      <td>
        <StyledDataCell>
          <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
            <Trans>{data.amount / 10 ** 6}</Trans>
          </ThemedText.BodyPrimary>
        </StyledDataCell>
      </td>
      <td>
        <StyledDataCell style={{ justifyContent: "right" }}>
          <Button
            onClick={() =>
              handleClaim(data.token_address, data.amount, data.proofs)
            }
          >
            {loading ? <Loader stroke="white" /> : "Claim"}
          </Button>
        </StyledDataCell>
      </td>
    </tr>
  );
}
