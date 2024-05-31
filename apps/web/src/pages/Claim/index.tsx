import styled, { ThemeContext, css, useTheme } from "styled-components";
import ClaimTokenRow from "./ClaimTokenRow";
import { AlertTriangle, Inbox } from "react-feather";
import { useContext } from "react";
import {
  BrowserEvent,
  InterfaceElementName,
  InterfaceEventName,
  InterfacePageName,
} from "@uniswap/analytics-events";
import { Trace, TraceEvent } from "analytics";
import { ThemedText } from "theme/components";
import { Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import { useToggleAccountDrawer } from "components/AccountDrawer/MiniPortfolio/hooks";
import { ButtonPrimary } from "components/Button";
import { isSupportedChain } from "constants/chains";
import { AutoColumn } from "components/Column";
import { SwitchLocaleLink } from "components/SwitchLocaleLink";
import useFetchTokenData from "hooks/useFetchTokenData";
import { ToastContainer } from "react-toastify";

const PageWrapper = styled(AutoColumn)`
  padding: 68px 8px 0px;
  max-width: 870px;
  width: 100%;

  @media (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    max-width: 800px;
    padding-top: 48px;
  }

  @media (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    max-width: 500px;
    padding-top: 20px;
  }
`;

const MainContentWrapper = styled.main`
  background-color: ${({ theme }) => theme.surface1};
  border: 1px solid ${({ theme }) => theme.surface3};
  padding: 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const StyledTableHeader = styled.thead`
  background: ${({ theme }) => theme.surface2};
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
`;

const StyledHeaderCell = styled.th`
  padding: 12px 16px;
`;

const LoaderDiv = styled.div`
  height: 10px;
  width: 20%;
  border-radius: 16px;
  background: ${({ theme }) => theme.surface3};
  margin: 12px 16px;
`;

const IconStyle = css`
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
`;

const NetworkIcon = styled(AlertTriangle)`
  ${IconStyle}
`;

const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`;

const InboxIcon = styled(Inbox)`
  ${IconStyle}
`;

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    background: ${({ theme }) => theme.surface2};
    color: ${({ theme }) => theme.neutral2};
  }

  .Toastify__close-button {
    color: ${({ theme }) => theme.neutral1};
  }
`;

function WrongNetworkCard() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <PageWrapper>
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: "100%" }}>
            <MainContentWrapper>
              <ErrorContainer>
                <ThemedText.BodyPrimary
                  color={theme.neutral3}
                  textAlign="center"
                >
                  <NetworkIcon strokeWidth={1.2} />
                  <div data-testid="pools-unsupported-err">
                    <Trans>Your connected network is unsupported.</Trans>
                  </div>
                </ThemedText.BodyPrimary>
              </ErrorContainer>
            </MainContentWrapper>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
      <SwitchLocaleLink />
    </>
  );
}

function LoadingRows() {
  return (
    <tr>
      <td>
        <LoaderDiv />
      </td>
      <td>
        <LoaderDiv />
      </td>
      <td>
        <LoaderDiv />
      </td>
      <td>
        <LoaderDiv style={{ marginLeft: "auto" }} />
      </td>
    </tr>
  );
}

export default function Claim() {
  const { account, chainId } = useWeb3React();
  const theme = useTheme();
  const toggleWalletDrawer = useToggleAccountDrawer();
  const showConnectAWallet = Boolean(!account);
  const { tokenData, tokensLoading, setTokenData } = useFetchTokenData(account);

  if (!isSupportedChain(chainId)) {
    return <WrongNetworkCard />;
  }

  return (
    <Trace page={InterfacePageName.CLAIM_PAGE} shouldLogImpression>
      <StyledToast />
      <PageWrapper>
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: "100%" }}>
            <MainContentWrapper>
              {(account && tokenData && tokenData.length > 0) ||
              tokensLoading ? (
                <StyledTable>
                  <StyledTableHeader>
                    <tr>
                      <StyledHeaderCell>
                        <ThemedText.BodySecondary
                          fontWeight={500}
                          fontSize={16}
                        >
                          <Trans>#</Trans>
                        </ThemedText.BodySecondary>
                      </StyledHeaderCell>
                      <StyledHeaderCell>
                        <ThemedText.BodySecondary
                          fontWeight={500}
                          fontSize={16}
                        >
                          <Trans>Token name</Trans>
                        </ThemedText.BodySecondary>
                      </StyledHeaderCell>
                      <StyledHeaderCell>
                        <ThemedText.BodySecondary
                          fontWeight={500}
                          fontSize={16}
                        >
                          <Trans>Amount</Trans>
                        </ThemedText.BodySecondary>
                      </StyledHeaderCell>
                      <StyledHeaderCell style={{ textAlign: "right" }}>
                        <ThemedText.BodySecondary
                          fontWeight={500}
                          fontSize={16}
                        >
                          <Trans>Claim</Trans>
                        </ThemedText.BodySecondary>
                      </StyledHeaderCell>
                    </tr>
                  </StyledTableHeader>
                  <tbody>
                    {tokensLoading ? (
                      <>
                        <LoadingRows />
                        <LoadingRows />
                        <LoadingRows />
                        <LoadingRows />
                        <LoadingRows />
                        <LoadingRows />
                      </>
                    ) : (
                      tokenData.length > 0 &&
                      tokenData.map((data, index) => (
                        <ClaimTokenRow
                          key={data.id}
                          data={data}
                          index={index}
                          setTokenData={setTokenData}
                        />
                      ))
                    )}
                  </tbody>
                </StyledTable>
              ) : (
                <ErrorContainer>
                  <ThemedText.BodyPrimary
                    color={theme.neutral3}
                    textAlign="center"
                  >
                    <InboxIcon strokeWidth={1} style={{ marginTop: "2em" }} />
                    <div>
                      <Trans>Your unclaimed tokens will appear here.</Trans>
                    </div>
                  </ThemedText.BodyPrimary>
                  {showConnectAWallet && (
                    <TraceEvent
                      events={[BrowserEvent.onClick]}
                      name={InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED}
                      properties={{ received_swap_quote: false }}
                      element={InterfaceElementName.CONNECT_WALLET_BUTTON}
                    >
                      <ButtonPrimary
                        style={{
                          marginTop: "2em",
                          marginBottom: "2em",
                          padding: "8px 16px",
                        }}
                        onClick={toggleWalletDrawer}
                      >
                        <Trans>Connect a wallet</Trans>
                      </ButtonPrimary>
                    </TraceEvent>
                  )}
                </ErrorContainer>
              )}
            </MainContentWrapper>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </Trace>
  );
}
