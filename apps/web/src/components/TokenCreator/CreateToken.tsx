import { Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import { useToggleAccountDrawer } from "components/AccountDrawer/MiniPortfolio/hooks";
import { ButtonLight, ButtonPrimary } from "components/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemedText } from "theme/components";

const StyledHeader = styled.div`
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
`;

const StyledStepsContainer = styled.div`
  background: ${({ theme }) => theme.surface2};
  border-radius: 16px;
  padding: 1rem;
  margin: 0.5rem 0;
`;

const StyledStepsInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export default function CreateToken() {
  const { account } = useWeb3React();
  const toggleWalletDrawer = useToggleAccountDrawer();

  return (
    <>
      <StyledHeader>
        <ThemedText.BodySecondary
          fontWeight={700}
          fontSize={14}
          textAlign="center"
        >
          <Trans>Create your own token</Trans>
        </ThemedText.BodySecondary>
      </StyledHeader>
      <StyledStepsContainer>
        <StyledHeader style={{ paddingTop: 0, paddingLeft: 0 }}>
          <ThemedText.BodyPrimary fontWeight={600} fontSize={14}>
            <Trans>Steps</Trans>
          </ThemedText.BodyPrimary>
        </StyledHeader>
        <StyledStepsInnerContainer>
          <ThemedText.BodySecondary fontWeight={500} fontSize={16}>
            <Trans>1. Add basic info like name, ticker & logo</Trans>
          </ThemedText.BodySecondary>
          <ThemedText.BodySecondary fontWeight={500} fontSize={16}>
            <Trans>
              2. Add economics like Token supply, whitelist address, etc.
            </Trans>
          </ThemedText.BodySecondary>
          <ThemedText.BodySecondary fontWeight={500} fontSize={16}>
            <Trans>3. Add liquidity, confirm data and launch</Trans>
          </ThemedText.BodySecondary>
        </StyledStepsInnerContainer>
      </StyledStepsContainer>
      {!account ? (
        <ButtonLight onClick={toggleWalletDrawer}>
          <Trans>Connect wallet</Trans>
        </ButtonLight>
      ) : (
        <ButtonPrimary as={Link} to={`/launch/step1`}>
          <ThemedText.BodyPrimary fontWeight={700} fontSize={16}>
            <Trans>Continue</Trans>
          </ThemedText.BodyPrimary>
        </ButtonPrimary>
      )}
    </>
  );
}
