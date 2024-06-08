import styled from "styled-components";

import TickIcon from "../../../src/assets/images/tick.svg";
import { CloseIcon, ThemedText } from "theme/components";

interface SuccessProps {
  onClose: () => void;
  transactionHash: string;
}
const Wrapper = styled.div`
  padding: 1rem;
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.surface1};
  border-radius: 16px;
`;

const StyledLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
`;

const StyledCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 4rem 2rem;
  text-align: center;
`;

export default function Success({ onClose, transactionHash }: SuccessProps) {
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CloseIcon onClick={onClose} />
      </div>
      <StyledCenterDiv>
        <img src={TickIcon} width={64} height={64} alt="Success" />
        <ThemedText.BodyPrimary fontWeight={500} fontSize={16}>
          Airdrop success!
        </ThemedText.BodyPrimary>
      </StyledCenterDiv>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledLink href={`https://explorer.degen.tips/tx/${transactionHash}`}>
          View on Explorer
        </StyledLink>
      </div>
    </Wrapper>
  );
}
