import { InterfacePageName } from "@uniswap/analytics-events";
import { Trace } from "analytics";
import { AutoColumn } from "components/Column";
import Step3 from "components/TokenCreator/Step3";

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

export default function Step3Page() {
  return (
    <Trace page={InterfacePageName.LAUNCH_PAGE} shouldLogImpression>
      <PageWrapper>
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: "100%" }}>
            <Step3 />
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </Trace>
  );
}
