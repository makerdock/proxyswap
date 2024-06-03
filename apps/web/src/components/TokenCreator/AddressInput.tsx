import { RowBetween } from "components/Row";
import { isAddress } from "ethers/lib/utils";
import { useState, useEffect } from "react";
import styled, { createGlobalStyle, useTheme } from "styled-components";
import { ThemedText } from "theme/components";

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

const Button = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.surface3};
  border-radius: 5px;
  color: ${({ theme }) => theme.neutral2};
  font-size: 14px;
  font-weight: 500;
  padding: 2px 6px;
  cursor: pointer;
  margin-left: 0.25rem;
`;

type AddressInputProps = {
  address: string;
  percentage: string;
  index: number;
  editMode?: boolean;
  onRemove: (index: number) => void;
  onUpdate: (
    index: number,
    address: string,
    percentage: string,
    editMode: boolean,
  ) => void;
};

const isValidEthereumAddress = (address: string) => {
  return isAddress(address);
};

export default function AddressInput({
  address,
  percentage,
  index,
  editMode = false,
  onRemove,
  onUpdate,
}: AddressInputProps) {
  const theme = useTheme();
  const [showEditOptions, setShowEditOptions] = useState(editMode);
  const [editedAddress, setEditedAddress] = useState(address);
  const [editedPercentage, setEditedPercentage] = useState(percentage);

  useEffect(() => {
    setEditedAddress(address);
    setEditedPercentage(percentage);
  }, [address, percentage]);

  const isSaveDisabled =
    !isValidEthereumAddress(editedAddress) ||
    editedPercentage.trim() === "" ||
    parseFloat(editedPercentage) <= 0;

  return (
    <div
      style={{
        padding: "1rem",
        background: `${showEditOptions ? theme.surface2 : "transparent"}`,
      }}
    >
      <GlobalStyle />
      <ThemedText.BodySecondary
        fontSize={12}
        fontWeight={500}
        marginBottom="2px"
      >
        Address {index + 1}
      </ThemedText.BodySecondary>
      <RowBetween>
        {showEditOptions ? (
          <>
            <input
              type="text"
              value={editedAddress}
              placeholder="0x0000....000"
              onChange={(e) => setEditedAddress(e.target.value)}
              style={{
                fontSize: 16,
                fontWeight: 500,
                background: "transparent",
                border: "none",
                color: theme.neutral1,
                width: "50%",
                outline: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <input
                type="number"
                min="0"
                value={editedPercentage}
                placeholder="0.00"
                onChange={(e) => setEditedPercentage(e.target.value)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  background: "transparent",
                  border: "none",
                  color: theme.neutral1,
                  width: "46px",
                  outline: "none",
                  textAlign: "right",
                }}
              />
              <ThemedText.BodyPrimary
                fontSize={16}
                fontWeight={500}
                marginLeft="-4px"
              >
                %
              </ThemedText.BodyPrimary>
              <Button
                onClick={() => {
                  onUpdate(index, editedAddress, editedPercentage, false);
                  setShowEditOptions(false);
                }}
                disabled={isSaveDisabled}
                style={{
                  background: isSaveDisabled ? theme.surface3 : "transparent",
                  color: isSaveDisabled ? theme.neutral3 : theme.neutral2,
                  cursor: isSaveDisabled ? "not-allowed" : "pointer",
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => onRemove(index)}
                style={{
                  background: "#F53D6B0F",
                  color: "#F53D6B",
                }}
              >
                Delete
              </Button>
            </div>
          </>
        ) : (
          <>
            <ThemedText.BodyPrimary fontSize={16} fontWeight={500}>
              {editedAddress.slice(0, 5)}.....{editedAddress.slice(-5)}
            </ThemedText.BodyPrimary>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <ThemedText.BodyPrimary fontSize={16} fontWeight={500}>
                {editedPercentage}%
              </ThemedText.BodyPrimary>
              <Button onClick={() => setShowEditOptions(true)}>Edit</Button>
            </div>
          </>
        )}
      </RowBetween>
    </div>
  );
}
