import { Currency } from "@uniswap/sdk-core";
import { useWeb3React } from "@web3-react/core";
import { Trace } from "analytics";
import {
  ButtonGray,
  ButtonLight,
  ButtonPrimary,
  SmallButtonPrimary,
} from "components/Button";
import { AutoColumn } from "components/Column";
import { RowBetween } from "components/Row";
import CurrencySearchModal from "components/SearchModal/CurrencySearchModal";
import { useToggleAccountDrawer } from "components/AccountDrawer/MiniPortfolio/hooks";
import AddressInput from "components/TokenCreator/AddressInput";
import {
  createMerkleRoot,
  generateProofs,
  storeAirdropData,
} from "components/TokenCreator/backend";
import { defaultAbiCoder, isAddress } from "ethers/lib/utils";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import styled, { createGlobalStyle, useTheme } from "styled-components";
import { ThemedText } from "theme/components";
import { Z_INDEX } from "theme/zIndex";
import AIRDROP_ABI from "wallet/src/abis/airdrop.json";
import TOKEN_ABI from "wallet/src/abis/erc20_token.json";
import { v4 as uuid } from "uuid";
import { Contract } from "ethers";
import Loader from "components/Icons/LoadingSpinner";
import Modal from "components/Modal";
import Success from "./Success";
import { TraceEvent } from "@uniswap/analytics";
import { Trans } from "@lingui/macro";
import {
  BrowserEvent,
  InterfaceElementName,
  InterfaceEventName,
} from "@uniswap/analytics-events";
import CurrencyLogo from "components/Logo/CurrencyLogo";
import useCurrencyBalance from "lib/hooks/useCurrencyBalance";
import { NumberType, useFormatter } from "utils/formatNumbers";

type ContainerProps = {
  highlight: boolean;
};

const GlobalStyle = createGlobalStyle`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`;

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

const TokenQuantityInput = styled.input`
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.neutral1};
  outline: none;
  border-radius: 16px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.surface3};
`;

type ManualEntry = {
  id: string;
  address: string;
  percentage: string;
  editMode?: boolean;
};

type TokenInfo = {
  address: string | undefined;
  logoURI: string | undefined;
  name: string | undefined;
  symbol: string | undefined;
  decimals: number | undefined;
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

export default function Airdrop() {
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [addressEntries, setAddressEntries] = useState<ManualEntry[]>([]);
  const [tokenQuantity, setTokenQuantity] = useState<string>("");
  const { provider, account } = useWeb3React();
  const signer = provider?.getSigner();
  const initialFeesPercentage = 2.5;
  const theme = useTheme();
  const [userPercentage, setUserPercentage] = useState<number>(
    100 - initialFeesPercentage,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    currency ?? undefined,
  );
  const { formatCurrencyAmount } = useFormatter();
  const balance = formatCurrencyAmount({
    amount: selectedCurrencyBalance,
    type: NumberType.TokenNonTx,
  });
  const toggleWalletDrawer = useToggleAccountDrawer();
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
    return 100 - sumOfEntries;
  };

  useEffect(() => {
    const newUserPercentage = calculateUserPercentage();
    if (newUserPercentage !== userPercentage) {
      setUserPercentage(newUserPercentage);
    }
  }, [addressEntries]);

  useEffect(() => {
    if (currency) {
      if ("tokenInfo" in currency) {
        const { name, symbol, address, logoURI, decimals } = currency.tokenInfo;
        setTokenInfo({
          name,
          symbol,
          address,
          logoURI,
          decimals,
        });
      } else {
        const { name, symbol, address, decimals } = currency;
        setTokenInfo({
          name,
          symbol,
          address,
          logoURI: "",
          decimals,
        });
      }
    } else {
      setTokenInfo(null);
    }
  }, [currency]);

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
    addressEntries.length === 0 ||
    addressEntries.some(
      (entry) =>
        !isAddress(entry.address) ||
        entry.percentage.trim() === "" ||
        parseFloat(entry.percentage) <= 0,
    ) ||
    userPercentage < 0 ||
    tokenQuantity.trim() === "" ||
    parseFloat(tokenQuantity) <= 0 ||
    !tokenInfo ||
    parseFloat(tokenQuantity) > parseFloat(balance.replace(",", ""));

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const handleAirdrop = async () => {
    try {
      setLoading(true);
      const contractAddress = "0x43E9d3e0D57b286CC2a081381D1A9d38ADB4250a";

      const distribution = addressEntries.map((entry) => {
        const address = entry.address;
        const percentage = entry.percentage;
        const amount = BigInt(
          Math.floor(
            parseFloat(tokenQuantity) *
              parseFloat(percentage) *
              0.01 *
              10 ** tokenInfo?.decimals!,
          ),
        ).toString();
        return [address, amount];
      });

      const totalAmount = distribution.reduce((total, currentEntry) => {
        return total + BigInt(currentEntry[1]);
      }, BigInt(0));

      const totalAirdropTokens = totalAmount.toString();

      if (!signer) {
        throw new Error("Wallet not connected");
      }

      const { hash: rootHash } = await createMerkleRoot(distribution);
      const { proofs } = await generateProofs(distribution);

      const airdropContract = new Contract(
        contractAddress,
        AIRDROP_ABI,
        signer,
      );

      const tokenAddress = tokenInfo?.address;
      if (!tokenAddress) return;

      const tokenContract = new Contract(tokenAddress, TOKEN_ABI, signer);

      const approval = await tokenContract.approve(
        contractAddress,
        totalAirdropTokens,
      );

      await approval.wait();

      const tx = await airdropContract.deployAirdrop(
        tokenInfo?.address,
        rootHash,
        totalAirdropTokens,
      );

      const airdrop = await tx.wait();
      const { logs } = airdrop;
      const tokenAirdropLog = logs[logs.length - 1];
      const { topics } = tokenAirdropLog;
      const addressWithZeros = topics[topics.length - 1];
      const airdropAddress = defaultAbiCoder.decode(
        ["address"],
        addressWithZeros,
      );

      setTransactionHash(airdrop.transactionHash);

      const airdropData = distribution.map(([address, amount]) => ({
        airdropBy: account || "",
        address,
        tokenAddress: String(tokenInfo?.address),
        rootHash,
        claimed: false,
        proofs: proofs[address] || [],
        amount: amount.toString(),
        tokenLogo: tokenInfo?.logoURI || "",
        tickerName: tokenInfo?.symbol || "",
        tokenName: tokenInfo?.name || "",
        airdropContract: String(airdropAddress),
        decimals: tokenInfo?.decimals || 6,
      }));

      await storeAirdropData(airdropData);
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to execute airdrop:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Trace shouldLogImpression>
        {showSuccess && (
          <Modal isOpen={showSuccess} onDismiss={() => setShowSuccess(false)}>
            <Success
              onClose={() => setShowSuccess(false)}
              transactionHash={transactionHash}
            />
          </Modal>
        )}
        <GlobalStyle />
        <PageWrapper>
          <AutoColumn gap="lg" justify="center">
            <AutoColumn gap="lg" style={{ width: "100%" }}>
              <Wrapper>
                <Heading>
                  <ThemedText.BodySecondary fontSize={16} fontWeight={500}>
                    Airdrop
                  </ThemedText.BodySecondary>
                  <Button onClick={downloadSampleCSV}>Sample CSV</Button>
                </Heading>
                <Container style={{ padding: "1rem" }}>
                  <RowBetween>
                    <TokenQuantityInput
                      name="tokenQuantity"
                      id="tokenQuantity"
                      placeholder="Enter Token Quantity"
                      min="0"
                      type="number"
                      value={tokenQuantity}
                      onChange={(e) => setTokenQuantity(e.target.value)}
                    />
                    {tokenInfo ? (
                      <div style={{ position: "relative", padding: "10px 0" }}>
                        <SmallButtonPrimary
                          onClick={() => setModalOpen(true)}
                          style={{
                            borderRadius: "2rem",
                            background: theme.surface1,
                            border: `1px solid ${theme.surface3}`,
                            outline: "none",
                            color: theme.neutral1,
                          }}
                        >
                          <CurrencyLogo
                            currency={currency}
                            size="24px"
                            style={{ marginRight: "8px" }}
                          />
                          {tokenInfo?.symbol} <ChevronDown />
                        </SmallButtonPrimary>
                        <ThemedText.BodySecondary
                          fontSize={14}
                          textAlign="center"
                          style={{
                            position: "absolute",
                            right: "6px",
                            bottom: "-0.7rem",
                          }}
                        >
                          Balance: {balance}
                        </ThemedText.BodySecondary>
                      </div>
                    ) : (
                      <SmallButtonPrimary
                        onClick={() => setModalOpen(true)}
                        style={{ borderRadius: "2rem" }}
                      >
                        Select Token <ChevronDown />
                      </SmallButtonPrimary>
                    )}
                  </RowBetween>
                  <CurrencySearchModal
                    isOpen={modalOpen}
                    onDismiss={handleDismissSearch}
                    onCurrencySelect={setCurrency}
                    selectedCurrency={currency}
                  />
                </Container>
                <Container>
                  <Header>
                    <ThemedText.BodyPrimary fontSize={14} fontWeight={500}>
                      Add Airdrop address
                    </ThemedText.BodyPrimary>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <ResetButton
                        onClick={handleReset}
                        disabled={addressEntries.length === 0}
                        style={{
                          color:
                            addressEntries.length === 0
                              ? theme.neutral3
                              : theme.accent1,
                          cursor:
                            addressEntries.length === 0
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        Reset
                      </ResetButton>
                      <label htmlFor="csv" style={{ cursor: "pointer" }}>
                        <ThemedText.DeprecatedLink
                          fontSize={14}
                          fontWeight={500}
                        >
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
                          ref={
                            index === addressEntries.length - 1
                              ? lastEntryRef
                              : null
                          }
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
                    {!account ? (
                      <TraceEvent
                        events={[BrowserEvent.onClick]}
                        name={InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED}
                        element={InterfaceElementName.CONNECT_WALLET_BUTTON}
                      >
                        <ButtonLight
                          onClick={toggleWalletDrawer}
                          fontWeight={535}
                          $borderRadius="16px"
                        >
                          <Trans>Connect wallet</Trans>
                        </ButtonLight>
                      </TraceEvent>
                    ) : (
                      <ButtonPrimary
                        disabled={isContinueDisabled}
                        onClick={handleAirdrop}
                      >
                        {parseFloat(tokenQuantity) >
                        parseFloat(balance.replace(",", "")) ? (
                          `Insufficient ${tokenInfo?.symbol} Balance`
                        ) : loading ? (
                          <Loader stroke="white" />
                        ) : (
                          "Airdrop"
                        )}
                      </ButtonPrimary>
                    )}
                  </ButtonContainer>
                </Container>
              </Wrapper>
            </AutoColumn>
          </AutoColumn>
        </PageWrapper>
      </Trace>
    </>
  );
}
