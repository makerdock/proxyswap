import { ChainId } from "@uniswap/sdk-core";
import gql from "graphql-tag";

import { isSupportedChain } from "constants/chains";
import { useNftUniversalRouterAddressQuery } from "../__generated__/types-and-hooks";

gql`
  query NftUniversalRouterAddress($chain: Chain = ETHEREUM) {
    nftRoute(chain: $chain, senderAddress: "", nftTrades: []) {
      toAddress
    }
  }
`;

export function getURAddress(
  chainId?: number,
  nftURAddress?: string,
): string | undefined {
  if (!chainId) return undefined;
  // if mainnet and on NFT flow, use the contract address returned by GQL
  if (chainId === ChainId.MAINNET) {
    return nftURAddress ?? "0x57c9C9c9BEd2AA33cf43dF285D173844F7245Ba3";
  }
  return isSupportedChain(chainId)
    ? "0x57c9C9c9BEd2AA33cf43dF285D173844F7245Ba3"
    : undefined;
  return undefined;
}

export function useNftUniversalRouterAddress() {
  const { data, loading } = useNftUniversalRouterAddressQuery({
    // no cache because a different version of nftRoute query is going to be called around the same time
    fetchPolicy: "no-cache",
  });

  return {
    universalRouterAddress: data?.nftRoute?.toAddress,
    universalRouterAddressIsLoading: loading,
  };
}
