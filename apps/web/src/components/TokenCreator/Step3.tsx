import { ButtonGray, ButtonPrimary } from "components/Button";
import { Market } from "components/Icons/Market";
import { Money } from "components/Icons/Money";
import { User } from "components/Icons/User";
import { RowBetween } from "components/Row";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "react-feather";
import styled, { useTheme } from "styled-components";
import { ThemedText } from "theme/components";
import { Z_INDEX } from "theme/zIndex";
import AddressInput from "./AddressInput";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { isAddress } from "ethers/lib/utils";
import { Field, typeInput, typeStartPriceInput } from "state/mint/v3/actions";
import { useDispatch } from "react-redux";

type ContainerProps = {
  highlight: boolean;
};

const Wrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  z-index: ${Z_INDEX.default};
`;

const Container = styled.div`
  background: ${({ theme }) => theme.surface1};
  border-radius: 16px;
  border: ${({ theme }) => `1px solid ${theme.surface3}`};
  margin-top: 1rem;
`;

const StatsOuterContainer = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.surface1};
  border-radius: 16px;
  border: ${({ theme, highlight }) =>
    highlight ? `1px solid ${theme.accent3}` : `1px solid ${theme.surface3}`};
  margin-top: 1rem;
  transition: border 0.1s ease-out;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-left: 1rem;
  color: ${({ theme }) => theme.neutral2};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.surface3};
`;

const StatsContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddressContainer = styled.div`
  max-height: 14rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    display: block;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.surface3} !important;
    border-radius: 4px;
  }

  -ms-overflow-style: none;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.surface3} transparent;
`;

const ButtonContainer = styled.div`
  padding: 1rem;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.neutral2};
`;

const ResetButton = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.accent1};
`;

const CSVInput = styled.input`
  display: none;
`;

const GoBack = styled(Link)`
  color: ${({ theme }) => theme.neutral2};
  height: 16px;
`;

const ContinueLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

type ManualEntry = {
  id: string;
  address: string;
  percentage: string;
  editMode?: boolean;
};

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
  const dispatch = useDispatch();
  const csvInputRef = useRef<HTMLInputElement>(null);

  const initialCSVData = queryParams.get("csvData");
  const tokenName = queryParams.get("tokenName") || "";
  const tickerName = queryParams.get("tickerName") || "";
  const tokenQuantity = queryParams.get("tokenQuantity") || "";
  const tokenSupply = queryParams.get("tokenSupply") || "";
  const degenAmount = queryParams.get("degenAmount") || "";
  const tokenLogo = queryParams.get("tokenLogo") || "";
  const initialTokenPrice = queryParams.get("initialTokenPrice") || "";
  const logo = queryParams.get("logo") || "";
  const tokenAmount = (
    parseFloat(tokenSupply) *
    0.01 *
    parseFloat(tokenQuantity)
  ).toString();

  const [addressEntries, setAddressEntries] = useState<ManualEntry[]>([]);
  const initialMarketPercentage = 10;
  const initialFeesPercentage = 2.5;
  const theme = useTheme();
  const [showStats, setShowStats] = useState(true);
  const [userPercentage, setUserPercentage] = useState<number>(
    100 - initialMarketPercentage - initialFeesPercentage,
  );
  const [highlightChange, setHighlightChange] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCSVData) {
      const parsedCSVData: ManualEntry[] = initialCSVData
        .split("\n")
        .map((row) => {
          const [address, percentage] = row.trim().split(",");
          return {
            id: uuid(),
            address,
            percentage: percentage.trim(),
            editMode: false,
          };
        });
      setAddressEntries(parsedCSVData);
    }
  }, [initialCSVData]);

  const addPercentage = (entries: ManualEntry[]): ManualEntry[] => {
    const entryMap = new Map<string, ManualEntry>();

    entries.forEach((entry) => {
      const key = entry.address || entry.id;
      const existingEntry = entryMap.get(key);
      if (existingEntry) {
        const updatedPercentage =
          parseFloat(existingEntry.percentage) + parseFloat(entry.percentage);
        entryMap.set(key, {
          ...existingEntry,
          percentage: updatedPercentage.toString(),
        });
      } else {
        entryMap.set(key, { ...entry });
      }
    });

    return Array.from(entryMap.values());
  };

  const handleCSVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;

        const initialEntries: ManualEntry[] = result.split("\n").map((row) => {
          const [address, percentage] = row.trim().split(",");
          return {
            id: uuid(),
            address,
            percentage: percentage.trim(),
            editMode: false,
          };
        });
        setAddressEntries((prevEntries) =>
          addPercentage([...prevEntries, ...initialEntries]),
        );
      };
      reader.readAsText(file);
    }
  };

  const addAddressEntry = () => {
    const newEntry: ManualEntry = {
      id: uuid(),
      address: "",
      percentage: "",
      editMode: true,
    };
    setAddressEntries((prevEntries) =>
      addPercentage([...prevEntries, newEntry]),
    );
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current?.lastElementChild?.scrollIntoView({
          behavior: "smooth",
        });
      }, 10);
    }
  };

  const calculateUserPercentage = (): number => {
    const sumOfEntries = addressEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.percentage || "0"),
      0,
    );
    return 100 - initialMarketPercentage - initialFeesPercentage - sumOfEntries;
  };

  useEffect(() => {
    const newUserPercentage = calculateUserPercentage();
    if (newUserPercentage !== userPercentage) {
      setUserPercentage(newUserPercentage);
      setHighlightChange(true);
      setTimeout(() => {
        setHighlightChange(false);
      }, 1000);
    }
  }, [addressEntries]);

  const removeAddressEntry = (index: number) => {
    setAddressEntries((currentEntries) => {
      const filteredEntries = currentEntries.filter((_, i) => i !== index);
      return addPercentage(filteredEntries);
    });
  };

  const handleEntryUpdate = (
    index: number,
    address: string,
    percentage: string,
    editMode: boolean = false,
  ) => {
    setAddressEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        address,
        percentage,
        editMode,
      };
      return addPercentage(updatedEntries);
    });
  };

  const handleReset = () => {
    setAddressEntries([]);
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
    }
  };

  const isContinueDisabled =
    addressEntries.some(
      (entry) =>
        !isAddress(entry.address) ||
        entry.percentage.trim() === "" ||
        parseFloat(entry.percentage) <= 0,
    ) || userPercentage < 0;

  const addresses = addressEntries.map((entry) => [
    entry.address,
    entry.percentage,
  ]);

  return (
    <Wrapper>
      <Heading>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <GoBack
            to={`/launch/step2?tokenQuantity=${tokenQuantity}&tokenSupply=${tokenSupply}&degenAmount=${degenAmount}&tokenName=${tokenName}&tickerName=${tickerName}&tokenLogo=${tokenLogo}&initialTokenPrice=${initialTokenPrice}&logo=${logo}&csvData=${encodeURIComponent(
              addresses?.map((row) => row.join(",")).join("\n") || "",
            )}`}
          >
            <ArrowLeft size={16} />
          </GoBack>
          <ThemedText.BodySecondary fontSize={16} fontWeight={500}>
            Step 3/3
          </ThemedText.BodySecondary>
        </div>
        <Button onClick={downloadSampleCSV}>Sample CSV</Button>
      </Heading>
      <Container>
        <Header>
          <ThemedText.BodyPrimary fontSize={14} fontWeight={500}>
            Add Airdrop address
          </ThemedText.BodyPrimary>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ResetButton
              onClick={handleReset}
              disabled={addressEntries.length === 0}
              style={{
                color:
                  addressEntries.length === 0 ? theme.neutral3 : theme.accent1,
                cursor: addressEntries.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Reset
            </ResetButton>
            <label htmlFor="csv" style={{ cursor: "pointer" }}>
              <ThemedText.DeprecatedLink fontSize={14} fontWeight={500}>
                Upload CSV
              </ThemedText.DeprecatedLink>
              <CSVInput
                ref={csvInputRef}
                type="file"
                name="csv"
                accept=".csv"
                id="csv"
                onChange={handleCSVChange}
              />
            </label>
          </div>
        </Header>
        <AddressContainer ref={containerRef}>
          {!!addressEntries.length ? (
            addressEntries.map((entry, index) => (
              <div
                ref={index === addressEntries.length - 1 ? lastEntryRef : null}
                key={entry.id}
              >
                <AddressInput
                  address={entry.address}
                  percentage={entry.percentage}
                  index={index}
                  editMode={entry.editMode}
                  onRemove={removeAddressEntry}
                  onUpdate={handleEntryUpdate}
                />
              </div>
            ))
          ) : (
            <>
              <ThemedText.BodySecondary
                fontSize={12}
                fontWeight={500}
                textAlign="center"
                marginBottom="8px"
                marginTop="2rem"
              >
                Start by adding address
              </ThemedText.BodySecondary>
              <ThemedText.BodyPrimary
                fontSize={16}
                fontWeight={500}
                textAlign="center"
                marginBottom="2rem"
              >
                Addresses you add will appear here
              </ThemedText.BodyPrimary>
            </>
          )}
        </AddressContainer>
        <ButtonContainer>
          <ButtonGray marginBottom="1rem" onClick={addAddressEntry}>
            Add address
          </ButtonGray>
          <ContinueLink
            to={
              !addressEntries.length
                ? `/launch/confirmation?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                    tickerName,
                  )}&tokenLogo=${tokenLogo}&tokenQuantity=${encodeURIComponent(
                    tokenQuantity,
                  )}&tokenSupply=${encodeURIComponent(tokenSupply)}&degenAmount=${encodeURIComponent(
                    degenAmount,
                  )}&initialTokenPrice=${initialTokenPrice}`
                : !isContinueDisabled
                  ? `/launch/confirmation?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                      tickerName,
                    )}&tokenLogo=${tokenLogo}&tokenQuantity=${encodeURIComponent(
                      tokenQuantity,
                    )}&tokenSupply=${encodeURIComponent(tokenSupply)}&degenAmount=${encodeURIComponent(
                      degenAmount,
                    )}&initialTokenPrice=${initialTokenPrice}&csvData=${encodeURIComponent(
                      addresses?.map((row) => row.join(",")).join("\n") || "",
                    )}`
                  : ""
            }
            onClick={(e) => {
              // Note this is for setting the initial value of CURRENCY_A
              dispatch(typeStartPriceInput({ typedValue: initialTokenPrice }));
              // Note this is for initializing the pool for the first time when there is no liquidity
              dispatch(
                typeInput({
                  typedValue: degenAmount,
                  field: Field.CURRENCY_A,
                  noLiquidity: true,
                }),
              );
              dispatch(
                typeInput({
                  typedValue: tokenAmount,
                  field: Field.CURRENCY_B,
                  noLiquidity: true,
                }),
              );
              if (isContinueDisabled) {
                e.preventDefault();
              }
            }}
          >
            <ButtonPrimary disabled={isContinueDisabled}>
              {addressEntries.length === 0 ? "Skip" : "Continue"}
            </ButtonPrimary>
          </ContinueLink>
        </ButtonContainer>
      </Container>
      <StatsOuterContainer highlight={highlightChange}>
        <Header style={{ borderBottom: ` ${!showStats ? "none" : ""}` }}>
          <ThemedText.BodyPrimary fontSize={14} fontWeight={500}>
            Your stats
          </ThemedText.BodyPrimary>
          <Button
            onClick={() => {
              setShowStats((prev) => !prev);
            }}
          >
            {showStats ? "Hide" : "Show"}
          </Button>
        </Header>
        {showStats && (
          <StatsContainer>
            <RowBetween>
              <ThemedText.BodySecondary
                fontSize={14}
                fontWeight={500}
                display="flex"
                alignSelf="center"
                style={{ gap: "8px" }}
              >
                <User fill={theme.neutral2} /> Your percentage
              </ThemedText.BodySecondary>
              <ThemedText.BodyPrimary fontSize={14} fontWeight={500}>
                {userPercentage}%
              </ThemedText.BodyPrimary>
            </RowBetween>
            <RowBetween>
              <ThemedText.BodySecondary
                fontSize={14}
                fontWeight={500}
                display="flex"
                alignSelf="center"
                style={{ gap: "8px" }}
              >
                <Money fill={theme.neutral2} /> Fees
              </ThemedText.BodySecondary>
              <ThemedText.BodyPrimary fontSize={14} fontWeight={500}>
                2.5%
              </ThemedText.BodyPrimary>
            </RowBetween>
            <RowBetween>
              <ThemedText.BodySecondary
                fontSize={14}
                fontWeight={500}
                display="flex"
                alignSelf="center"
                style={{ gap: "8px" }}
              >
                <Market fill={theme.neutral2} /> Market
              </ThemedText.BodySecondary>
              <ThemedText.BodyPrimary fontSize={14} fontWeight={500}>
                10%
              </ThemedText.BodyPrimary>
            </RowBetween>
          </StatsContainer>
        )}
      </StatsOuterContainer>
    </Wrapper>
  );
}
