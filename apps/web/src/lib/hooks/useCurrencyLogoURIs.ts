import { ChainId } from "@uniswap/sdk-core";
import useHttpLocations from "hooks/useHttpLocations";
import { useMemo } from "react";
import { isAddress } from "utils";

import degenLogo from "../../assets/svg/degen.svg";
import {
  NATIVE_CHAIN_ID,
  isDegen,
  nativeOnChain,
} from "../../constants/tokens";

type Network =
  | "ethereum"
  | "arbitrum"
  | "optimism"
  | "polygon"
  | "smartchain"
  | "celo"
  | "avalanchec"
  | "base"
  | "degen";

export function chainIdToNetworkName(networkId: ChainId): Network {
  switch (networkId) {
    case ChainId.DEGEN:
      return "degen";
    default:
      return "degen";
  }
}

export function getNativeLogoURI(chainId: ChainId = ChainId.MAINNET): string {
  switch (chainId) {
    case ChainId.DEGEN:
      return degenLogo;
    default:
      return degenLogo;
  }
}

function getTokenLogoURI(
  address: string,
  chainId: ChainId = ChainId.MAINNET,
): string | void {
  const networkName = chainIdToNetworkName(chainId);
  const networksWithUrls = [
    ChainId.ARBITRUM_ONE,
    ChainId.MAINNET,
    ChainId.OPTIMISM,
    ChainId.BNB,
    ChainId.AVALANCHE,
    ChainId.BASE,
  ];
  if (isDegen(chainId) && address === nativeOnChain(chainId).wrapped.address) {
    return degenLogo;
  }

  if (networksWithUrls.includes(chainId)) {
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`;
  }
}

export default function useCurrencyLogoURIs(
  currency:
    | {
        isNative?: boolean;
        isToken?: boolean;
        address?: string;
        chainId: number;
        logoURI?: string | null;
      }
    | null
    | undefined,
): string[] {
  const locations = useHttpLocations(currency?.logoURI);
  return useMemo(() => {
    const logoURIs = [...locations];
    if (currency) {
      if (currency.isNative || currency.address === NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId));
      } else if (currency.isToken || currency.address) {
        const checksummedAddress = isAddress(currency.address);
        const logoURI =
          checksummedAddress &&
          getTokenLogoURI(checksummedAddress, currency.chainId);
        if (logoURI) {
          logoURIs.push(logoURI);
        }
      }
    }
    return logoURIs;
  }, [currency, locations]);
}
