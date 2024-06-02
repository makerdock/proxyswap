import { Contract } from "@ethersproject/contracts";
import { Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import { ButtonPrimary } from "components/Button";
import Loader from "components/Icons/LoadingSpinner";
import { defaultAbiCoder } from "ethers/lib/utils";
import { useBalanceAndRate } from "hooks/useBalanceandRate";
import useCreateLiquidityPool, { liquidityPoolConfig } from "hooks/useCreateLiquidityPool";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Separator, ThemedText } from "theme/components";
import TOKEN_CREATOR_ABI from "wallet/src/abis/token-creator.json";
import {
  TokenHolderData,
  createMerkleRoot,
  generateProofs,
  storeData,
} from "./backend";

const StyledHeader = styled.div`
  position: relative;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledOuterContainer = styled.div`
  padding: 0.75rem;
  margin-top: 0.75rem;
`;

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.surface2};
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 4px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LiquidityPoolValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const LiquidityPoolValueInnerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 368px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const GoBack = styled(Link)`
  margin-right: auto;
  position: absolute;
  color: ${({ theme }) => theme.neutral2};
  left: 5px;
`;

const parseCSV = (csvString: string) => {
  const rows = csvString.trim().split("\n");
  return rows.map((row) => row.split(","));
};

const formatNumberWithAbbreviation = (number: number) => {
  const abbreviations: { [key: string]: number } = { b: 1e9, m: 1e6, k: 1e3 };
  for (const abbreviation in abbreviations) {
    if (number >= abbreviations[abbreviation]) {
      return `${(number / abbreviations[abbreviation]).toFixed(2)}${abbreviation}`;
    }
  }
  return number.toFixed(2);
};

export default function Confirmation() {
  // @TODO need to pass DEGEN ADDRESS as TokenB and the creatortoken as TokenB
  const { onAdd } = useCreateLiquidityPool({
    currencyIdA: liquidityPoolConfig.currencyIdA,
    currencyIdB: liquidityPoolConfig.currencyIdB,
    feeAmountFromUrl: liquidityPoolConfig.feeAmountFromUrl,
    maxPrice: liquidityPoolConfig.maxPrice,
    minPrice: liquidityPoolConfig.minPrice
  })
  const { provider, account } = useWeb3React();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const { rate } = useBalanceAndRate(account, provider);

  const tokenName = queryParams.get("tokenName") || "";
  const tickerName = queryParams.get("tickerName") || "";
  const tokenQuantity = queryParams.get("tokenQuantity") || "";
  const csvData = queryParams.get("csvData") || "";
  const tokenSupply = queryParams.get("tokenSupply") || "";
  const degenAmount = queryParams.get("degenAmount") || "";
  const initialTokenPrice = queryParams.get("initialTokenPrice") || "";
  const tokenLogo = queryParams.get("tokenLogo") || "";

  const tokenDistribution = csvData && parseCSV(csvData);
  const tokenSupplyQuantity =
    parseFloat(tokenSupply) * 0.01 * parseFloat(tokenQuantity);

  const totalPercentage =
    csvData &&
    tokenDistribution &&
    tokenDistribution.reduce((total, rowData) => {
      const percentage = parseFloat(rowData[1]);
      return total + (isNaN(percentage) ? 0 : percentage);
    }, 0);

  const signer = provider?.getSigner();
  const contractAddress = "0x9FD46C80C890D579d08d2434aC44aF3D6B497c16";
  const maxSupply = BigInt(
    Math.floor(parseFloat(tokenQuantity) * 10 ** 6),
  ).toString();

  const liquidityTokenAmount = BigInt(
    Math.floor(
      parseFloat(tokenQuantity) * parseFloat(tokenSupply) * 0.01 * 10 ** 6,
    ),
  ).toString();

  const distribution =
    csvData &&
    tokenDistribution &&
    tokenDistribution.map((rowData) => {
      const address = rowData[0];
      const percentage = parseFloat(rowData[1]);
      const amount = BigInt(
        Math.floor(parseFloat(tokenQuantity) * percentage * 0.01 * 10 ** 6),
      ).toString();

      return [address, amount];
    });

  const totalDistributionAmount =
    csvData &&
    tokenDistribution &&
    distribution &&
    distribution.reduce((total, [, amount]) => {
      return total + BigInt(amount);
    }, BigInt(0));

  const totalDistributionAmountString = totalDistributionAmount
    ? totalDistributionAmount.toString()
    : 0;

  const handleConfirmTokenCreation = async () => {
    try {
      if (!signer) return;
      setLoading(true);

      let rootHash =
        "0x0000000000000000000000000000000000000000000000000000000000000000";
      let proofs: Record<string, any> = {};

      await onAdd()
      if (!!distribution.length) {
        const { hash } = await createMerkleRoot(distribution);
        rootHash = hash;

        const { proofs: generatedProofs } = await generateProofs(distribution);
        proofs = generatedProofs;
      }

      const uniswapRouterAddress = "0xfad0d1e0f47e944866e25376f5b0a4881f817f52";
      const tokenCreatorContract = new Contract(
        contractAddress,
        TOKEN_CREATOR_ABI,
        signer,
      );

      const tx = await tokenCreatorContract.deploy(
        tokenName,
        tickerName,
        maxSupply,
        totalDistributionAmountString,
        rootHash,
      );

      const token = await tx.wait();
      const { logs } = token;
      const tokenCreationLog = logs[logs.length - 1];
      const { topics } = tokenCreationLog;
      const tokenAddressWithZeros = topics[1];
      const tokenAddress = defaultAbiCoder.decode(
        ["address"],
        tokenAddressWithZeros,
      );

      const tokenData = {
        address: String(tokenAddress),
        createdBy: account,
        tokenLogo,
        rootHash,
        tokenName,
        tickerName,
      };

      let tokenHolderData: TokenHolderData[] = [];
      if (csvData && distribution) {
        tokenHolderData = distribution.map(([address, amount]) => ({
          address,
          amount: amount.toString(),
          tokenAddress: String(tokenAddress),
          claimed: false,
          proofs: proofs[address],
        }));
      }

      if (tokenHolderData.length > 0) {
        await storeData(tokenData, tokenHolderData);
      } else {
        await storeData(tokenData);
      }

      setLoading(false);
      navigate(
        `/launch/success?tokenAddress=${tokenAddress}&tickerName=${tickerName}&transactionAddress=${tx.hash}&tokenLogo=${tokenLogo}`,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledHeader>
        <GoBack
          to={`/launch/step3?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
            tickerName,
          )}&tokenLogo=${tokenLogo}&tokenQuantity=${encodeURIComponent(tokenQuantity)}&tokenSupply=${encodeURIComponent(
            tokenSupply,
          )}&degenAmount=${encodeURIComponent(
            degenAmount,
          )}&initialTokenPrice=${initialTokenPrice}&csvData=${encodeURIComponent(csvData)}`}
        >
          <ArrowLeft size={16} />
        </GoBack>

        <ThemedText.BodySecondary
          fontWeight={700}
          fontSize={14}
          textAlign="center"
        >
          <Trans>Confirmation</Trans>
        </ThemedText.BodySecondary>
      </StyledHeader>
      <StyledOuterContainer>
        <ThemedText.BodyPrimary fontWeight={500} fontSize={12}>
          <Trans>Confirm</Trans>
        </ThemedText.BodyPrimary>
        <StyledContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Token name</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              {tokenName}
            </ThemedText.BodyPrimary>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Ticker name</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              ${tickerName}
            </ThemedText.BodyPrimary>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Token quantity</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              {tokenQuantity}
            </ThemedText.BodyPrimary>
          </DetailContainer>
        </StyledContainer>
        <ThemedText.BodyPrimary
          fontWeight={500}
          fontSize={12}
          marginTop={"16px"}
        >
          <Trans>Token distribution</Trans>
        </ThemedText.BodyPrimary>
        <StyledContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>You</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              {totalPercentage
                ? 100 - totalPercentage - Number(tokenSupply) - 2.5
                : 100 - Number(tokenSupply) - 2.5}
              %
            </ThemedText.BodyPrimary>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Fees</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              2.5%
            </ThemedText.BodyPrimary>
          </DetailContainer>
          {totalPercentage && (
            <DetailContainer>
              <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
                <Trans>Claim</Trans>
              </ThemedText.BodySecondary>
              <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                {totalPercentage}%
              </ThemedText.BodyPrimary>
            </DetailContainer>
          )}
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Market/LP</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              {tokenSupply}%
            </ThemedText.BodyPrimary>
          </DetailContainer>
        </StyledContainer>
        <ThemedText.BodyPrimary
          fontWeight={500}
          fontSize={12}
          marginTop={"16px"}
        >
          <Trans>Token price</Trans>
        </ThemedText.BodyPrimary>
        <StyledContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Liquidity Pool</Trans>
            </ThemedText.BodySecondary>
            <LiquidityPoolValue>
              <LiquidityPoolValueInnerDiv>
                <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                  {formatNumberWithAbbreviation(tokenSupplyQuantity)} $
                  {tickerName}
                </ThemedText.BodyPrimary>
                <ThemedText.BodySecondary fontWeight={400} fontSize={12}>
                  {tokenSupply}% of supply
                </ThemedText.BodySecondary>
              </LiquidityPoolValueInnerDiv>
              <LiquidityPoolValueInnerDiv>
                <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                  {parseFloat(degenAmount).toFixed(2)} DEGEN
                </ThemedText.BodyPrimary>
                <ThemedText.BodySecondary fontWeight={400} fontSize={12}>
                  ${(parseFloat(degenAmount) * rate).toFixed(6)}
                </ThemedText.BodySecondary>
              </LiquidityPoolValueInnerDiv>
            </LiquidityPoolValue>
          </DetailContainer>
          <DetailContainer>
            <ThemedText.BodySecondary fontWeight={500} fontSize={14}>
              <Trans>Initial price</Trans>
            </ThemedText.BodySecondary>
            <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
              {parseFloat(initialTokenPrice).toFixed(9)}$
            </ThemedText.BodyPrimary>
          </DetailContainer>
        </StyledContainer>
      </StyledOuterContainer>
      <Separator />
      <ButtonPrimary
        marginTop={"0.5rem"}
        onClick={handleConfirmTokenCreation}
        disabled={loading}
      >
        {loading ? <Loader stroke="white" /> : "Confirm & deploy"}
      </ButtonPrimary>
    </>
  );
}
