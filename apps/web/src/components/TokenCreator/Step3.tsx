import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Button";
import { useCSVData } from "hooks/useCSVData";
import { ArrowLeft, Upload } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Separator, ThemedText } from "theme/components";
import { useState, useCallback } from "react";

const StyledHeader = styled.div`
  position: relative;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CSVInput = styled.input`
  display: none;
`;

const CSVLabel = styled.label`
  width: 100%;
  height: 112px;
  border-radius: 12px;
  border: 1px dashed ${({ theme }) => theme.surface3};
  cursor: pointer;
  background: ${({ theme }) => theme.surface2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: auto;
`;

const TableHeader = styled.th`
  padding: 8px 16px 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.surface3};

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;

  &:last-child {
    text-align: right;
    font-weight: 600;
    font-size: 14px;
    opacity: 0.48;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const GoBack = styled(Link)`
  margin-right: auto;
  position: absolute;
  color: ${({ theme }) => theme.neutral2};
  left: 5px;
`;

const AirdropContainer = styled.div`
  border-radius: 12px;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.surface3};
  margin-top: 12px;
  overflow-x: auto;
`;

const AirdropDetailsInput = styled.input`
  background: none;
  color: ${({ theme }) => theme.neutral1};
  outline: none;
  font-weight: 500;
  font-size: 14px;
  border-radius: 12px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.surface3};

  &:last-child {
    text-align: right;
  }
`;

const Container = styled.div`
  padding: 12px;
  margin-top: 12px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HelperText = styled.span`
  font-weight: 400;
  font-size: 12px;
  opacity: 0.48;
  text-align: center;
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 10rem;
`;

const ContinueLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const downloadSampleCSV = () => {
  const csvContent =
    "Recipient Address,Percentage Allocation\n" +
    "Recipient Address,Percentage Allocation\n" +
    "Recipient Address,Percentage Allocation\n" +
    "Recipient Address,Percentage Allocation";
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "AirdropSample.csv";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export default function Step3() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCSVData = queryParams.get("csvData");
  const {
    csvData,
    editedCSVData,
    totalPercentage,
    handleCSVChange,
    setEditedCSVData,
    setCSVData,
  } = useCSVData(initialCSVData);

  const [isDragOver, setIsDragOver] = useState(false);

  const tokenName = queryParams.get("tokenName") || "";
  const tickerName = queryParams.get("tickerName") || "";
  const tokenQuantity = queryParams.get("tokenQuantity") || "";
  const tokenSupply = queryParams.get("tokenSupply") || "";
  const degenAmount = queryParams.get("degenAmount") || "";
  const tokenLogo = queryParams.get("tokenLogo") || "";
  const initialTokenPrice = queryParams.get("initialTokenPrice") || "";
  const logo = queryParams.get("logo") || "";

  const disableButton = totalPercentage + Number(tokenSupply) >= 97.5;

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setCSVData(result);
          setEditedCSVData(
            result
              .trim()
              .split("\n")
              .map((row) => row.split(",")),
          );
        };
        reader.readAsText(file);
      }
    },
    [setCSVData, setEditedCSVData],
  );

  return (
    <>
      <StyledHeader>
        <GoBack
          to={`/launch/step2?tokenQuantity=${tokenQuantity}&tokenSupply=${tokenSupply}&degenAmount=${degenAmount}&tokenName=${tokenName}&tickerName=${tickerName}&tokenLogo=${tokenLogo}&initialTokenPrice=${initialTokenPrice}&logo=${logo}&csvData=${encodeURIComponent(
            editedCSVData?.map((row) => row.join(",")).join("\n") || "",
          )}`}
        >
          <ArrowLeft size={16} />
        </GoBack>

        <ThemedText.BodySecondary
          fontWeight={700}
          fontSize={14}
          textAlign="center"
        >
          <Trans>Step 3/3</Trans>
        </ThemedText.BodySecondary>
      </StyledHeader>
      <Container>
        <FlexRow>
          <ThemedText.BodyPrimary
            fontWeight={500}
            fontSize={12}
            opacity={"0.76"}
          >
            <Trans>Add airdrop details</Trans>
          </ThemedText.BodyPrimary>
          <ThemedText.BodyPrimary
            fontWeight={500}
            fontSize={12}
            opacity={"0.76"}
            onClick={csvData ? () => setCSVData(null) : downloadSampleCSV}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <Trans>{csvData ? "Reset CSV" : "Download CSV"}</Trans>
          </ThemedText.BodyPrimary>
        </FlexRow>
        {csvData ? (
          <AirdropContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader style={{ textAlign: "left" }}>
                    <ThemedText.BodySecondary fontWeight={600} fontSize={12}>
                      <Trans>Address</Trans>
                    </ThemedText.BodySecondary>
                  </TableHeader>
                  <TableHeader style={{ textAlign: "right" }}>
                    <ThemedText.BodySecondary fontWeight={600} fontSize={12}>
                      <Trans>Percentage</Trans>
                    </ThemedText.BodySecondary>
                  </TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>
                    <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                      <Trans>You</Trans>
                    </ThemedText.BodyPrimary>
                  </TableCell>
                  <TableCell>
                    <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                      <Trans>
                        {100 - totalPercentage - 2.5 - Number(tokenSupply)} %
                      </Trans>
                    </ThemedText.BodyPrimary>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                      <Trans>Fees</Trans>
                    </ThemedText.BodyPrimary>
                  </TableCell>
                  <TableCell>
                    <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                      <Trans>2.5 %</Trans>
                    </ThemedText.BodyPrimary>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                      <Trans>Market</Trans>
                    </ThemedText.BodyPrimary>
                  </TableCell>
                  <TableCell>
                    <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                      <Trans>{tokenSupply} %</Trans>
                    </ThemedText.BodyPrimary>
                  </TableCell>
                </TableRow>
                {editedCSVData?.map((rowData, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell style={{ padding: "4px 8px 4px 8px" }}>
                      <AirdropDetailsInput
                        value={rowData[0]}
                        onChange={(e) => {
                          const newData = editedCSVData.map((r) => r.slice());
                          newData[rowIndex][0] = e.target.value;
                          setEditedCSVData(newData);
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ padding: "4px 16px 4px 8px" }}>
                      <AirdropDetailsInput
                        style={{
                          width: "36px",
                        }}
                        value={rowData[1]}
                        onChange={(e) => {
                          const newData = editedCSVData.map((r) => r.slice());
                          newData[rowIndex][1] = e.target.value;
                          setEditedCSVData(newData);
                        }}
                      />
                      <ThemedText.BodyPrimary fontWeight={500} fontSize={14}>
                        <Trans>%</Trans>
                      </ThemedText.BodyPrimary>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </AirdropContainer>
        ) : (
          <UploadContainer>
            <CSVLabel
              htmlFor="csv"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload size={20} opacity={0.5} />
              <HelperText>
                <Trans>
                  Click and Select or Drag <br />
                  and drop CSV file
                </Trans>
              </HelperText>
            </CSVLabel>
            <CSVInput
              type="file"
              name="csv"
              accept=".csv"
              id="csv"
              onChange={handleCSVChange}
            />
          </UploadContainer>
        )}
      </Container>
      <Separator />
      <ContinueLink
        to={
          !csvData
            ? `/launch/confirmation?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                tickerName,
              )}&tokenLogo=${tokenLogo}&tokenQuantity=${encodeURIComponent(
                tokenQuantity,
              )}&tokenSupply=${encodeURIComponent(tokenSupply)}&degenAmount=${encodeURIComponent(
                degenAmount,
              )}&initialTokenPrice=${initialTokenPrice}`
            : !disableButton
              ? `/launch/confirmation?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                  tickerName,
                )}&tokenLogo=${tokenLogo}&tokenQuantity=${encodeURIComponent(
                  tokenQuantity,
                )}&tokenSupply=${encodeURIComponent(tokenSupply)}&degenAmount=${encodeURIComponent(
                  degenAmount,
                )}&initialTokenPrice=${initialTokenPrice}&csvData=${encodeURIComponent(
                  editedCSVData?.map((row) => row.join(",")).join("\n") || "",
                )}`
              : ""
        }
        onClick={(e) => {
          if (disableButton) {
            e.preventDefault();
          }
        }}
      >
        <ButtonPrimary disabled={disableButton} marginTop={"0.5rem"}>
          {!csvData
            ? "Skip"
            : disableButton
              ? "Percentage is more than 100"
              : "Continue"}
        </ButtonPrimary>
      </ContinueLink>
    </>
  );
}
