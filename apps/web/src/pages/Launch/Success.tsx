import { InterfacePageName } from "@uniswap/analytics-events";
import { Trace } from "analytics";
import { AutoColumn } from "components/Column";
import Success from "components/TokenCreator/Success";
import AppBody from "pages/AppBody";
import styled from "styled-components";

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

export default function SuccessPage() {
  return (
    <Trace page={InterfacePageName.LAUNCH_PAGE} shouldLogImpression>
      <PageWrapper>
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: "100%" }}>
            <AppBody>
              <div style={{ margin: "0.5rem" }}>
                <Success />
              </div>
            </AppBody>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </Trace>
  );
}
