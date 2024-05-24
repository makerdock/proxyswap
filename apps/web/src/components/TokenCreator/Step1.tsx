import { v4 as uuidv4 } from "uuid";
import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Button";
import Loader from "components/Icons/LoadingSpinner";
import { ChangeEvent, useState, useCallback, DragEvent } from "react";
import { ArrowLeft } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemedText } from "theme/components";
import useFetchLogo from "hooks/useFetchLogo";
import ImageUploadIcon from "assets/images/upload-image.svg";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const StyledHeader = styled.div`
  position: relative;
  padding: 0.75rem 0.5rem;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.div`
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const StyledInput = styled.input`
  background: ${({ theme }) => theme.surface2};
  border: none;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  outline: none;
  color: white;
  margin-top: 4px;
`;

const LogoInput = styled.input`
  display: none;
`;

const LogoLabel = styled.label`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 1px dashed rgba(255, 255, 255, 0.07);
  cursor: pointer;
  background: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const GoBack = styled(Link)`
  margin-right: auto;
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  left: 5px;
`;

const LogoUploadContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
`;

const HelperText = styled.p`
  font-weight: 400;
  font-size: 12px;
  opacity: 0.48;
  line-height: 130%;
`;

const ContinueLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

type InputFieldProps = {
  label: React.ReactNode;
  onChange: (value: string) => void;
  value: string;
  id: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  onChange,
  value,
  id,
  placeholder,
}) => (
  <label htmlFor={id}>
    <ThemedText.BodySecondary fontWeight={500} fontSize={12}>
      {label}
    </ThemedText.BodySecondary>
    <StyledInput
      name={id}
      id={id}
      placeholder={placeholder}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  </label>
);

export default function Step1() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenQuantity = queryParams.get("tokenQuantity") || "";
  const tokenSupply = queryParams.get("tokenSupply") || "";
  const degenAmount = queryParams.get("degenAmount") || "";
  const csvData = queryParams.get("csvData") || "";
  const [tokenName, setTokenName] = useState<string>(
    queryParams.get("tokenName") || "",
  );
  const [tickerName, setTickerName] = useState<string>(
    queryParams.get("tickerName") || "",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [logoFileName, setLogoFileName] = useState<string>(
    queryParams.get("tokenLogo") || "",
  );

  const { logoUrl, error } = useFetchLogo(logoFileName);

  const handleLogoChange = async (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>,
  ) => {
    setLoading(true);
    const file =
      (e as ChangeEvent<HTMLInputElement>).target?.files?.[0] ||
      (e as DragEvent<HTMLDivElement>).dataTransfer?.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }

    const fileName = uuidv4();
    setLogoFileName(fileName);
    uploadLogo(file, fileName);
  };

  const uploadLogo = useCallback(async (file: File, fileName: string) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => setLogoFileName(fileName);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("fileName", fileName);

      const response = await fetch(`${BACKEND_URL}/upload-token-logo`, {
        method: "POST",
        body: formData,
      });

      await response.json();
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const isInputsFilled =
    tokenName.trim() && tickerName.trim() && logoFileName.trim();

  return (
    <>
      <StyledHeader>
        <GoBack to="/launch">
          <ArrowLeft size={16} />
        </GoBack>
        <ThemedText.BodySecondary
          fontWeight={700}
          fontSize={14}
          textAlign="center"
        >
          <Trans>Step 1/3</Trans>
        </ThemedText.BodySecondary>
      </StyledHeader>
      <StyledContainer>
        <LogoUploadContainer
          onDrop={handleLogoChange}
          onDragOver={handleDragOver}
        >
          <LogoLabel htmlFor="logo">
            {loading ? (
              <Loader stroke="white" />
            ) : logoUrl ? (
              <img
                src={logoUrl}
                width="100%"
                height="100%"
                alt="Logo Preview"
              />
            ) : (
              <img
                src={ImageUploadIcon}
                width={20}
                height={20}
                alt="Upload Icon"
              />
            )}
          </LogoLabel>
          <HelperText>
            <Trans>
              Click and Select or Drag and drop
              <br /> the logo image ( SVG, PNG & JPEG)
            </Trans>
          </HelperText>
          <LogoInput
            type="file"
            name="logo"
            accept="image/png, image/svg, image/jpeg"
            id="logo"
            onChange={handleLogoChange}
          />
        </LogoUploadContainer>
        <InputField
          label={<Trans>Token name</Trans>}
          onChange={setTokenName}
          value={tokenName}
          id="tokenName"
          placeholder="Enter token name"
        />
        <InputField
          label={<Trans>Ticker name</Trans>}
          onChange={setTickerName}
          value={tickerName}
          id="tickerName"
          placeholder="Ticker"
        />
      </StyledContainer>
      <ContinueLink
        to={
          isInputsFilled
            ? `/launch/step2?tokenName=${encodeURIComponent(tokenName)}&tickerName=${encodeURIComponent(
                tickerName,
              )}&tokenLogo=${logoFileName}&tokenQuantity=${tokenQuantity}&tokenSupply=${tokenSupply.replace(
                "%",
                "",
              )}&degenAmount=${degenAmount}&csvData=${encodeURIComponent(csvData)}`
            : ""
        }
        onClick={(e) => {
          if (!isInputsFilled) {
            e.preventDefault();
          }
        }}
      >
        <ButtonPrimary disabled={!isInputsFilled}>
          <ThemedText.BodyPrimary fontWeight={700} fontSize={16}>
            <Trans>Continue</Trans>
          </ThemedText.BodyPrimary>
        </ButtonPrimary>
      </ContinueLink>
    </>
  );
}
