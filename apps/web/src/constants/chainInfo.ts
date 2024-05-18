import { ChainId } from "@uniswap/sdk-core";
import ms from "ms";

import { SupportedL1ChainId, SupportedL2ChainId } from "./chains";
import { DEGEN_LIST } from "./lists";

export const AVERAGE_L1_BLOCK_TIME = ms(`12s`);

// The block number at which v3 was deployed on each chain, separate from the UNIVERSAL_ROUTER_CREATION_BLOCK
export const START_BLOCKS: { [key: number]: number } = {
  [ChainId.DEGEN]: 4857412,
};

export enum NetworkType {
  L1,
  L2,
}
interface BaseChainInfo {
  readonly networkType: NetworkType;
  readonly blockWaitMsBeforeWarning?: number;
  readonly docs: string;
  readonly bridge?: string;
  readonly explorer: string;
  readonly infoLink: string;
  readonly label: string;
  readonly helpCenterUrl?: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
  readonly color?: string;
  readonly backgroundColor?: string;
}

interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1;
  readonly defaultListUrl?: string;
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2;
  readonly bridge: string;
  readonly statusPage?: string;
  readonly defaultListUrl: string;
}

/**
 * `ChainInfoMap` is a TypeScript type that defines a mapping from chain IDs to their respective chain information.
 * It uses TypeScript's mapped types and intersection types to construct a comprehensive type that includes:
 * - A general mapping from any number (representing chain IDs) to either `L1ChainInfo` or `L2ChainInfo`.
 * - A specific mapping for supported Layer 2 chain IDs (`SupportedL2ChainId`) to `L2ChainInfo`.
 * - A specific mapping for supported Layer 1 chain IDs (`SupportedL1ChainId`) to `L1ChainInfo`.
 * This structure ensures that each chain ID is associated with the correct type of chain information based on whether it is Layer 1 or Layer 2.
 */
type ChainInfoMap = {
  readonly [chainId: number]: L1ChainInfo | L2ChainInfo;
} & Partial<
  {
    readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
  } & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }
>;

const CHAIN_INFO: ChainInfoMap = {
  [ChainId.DEGEN]: {
    networkType: NetworkType.L2,
    bridge: "https://bridge.degen.tips",
    docs: "https://docs.degenscore.com",
    explorer: "https://explorer.degen.tips",
    infoLink: "",
    label: "Degen",
    defaultListUrl: DEGEN_LIST,
    helpCenterUrl: "",
    nativeCurrency: { name: "Degen", symbol: "DEGEN", decimals: 18 },
  },
} as const;

export function getChainInfo(
  chainId: SupportedL1ChainId,
  featureFlags?: Record<
    ChainId | SupportedL1ChainId | SupportedL2ChainId | number,
    boolean
  >,
): L1ChainInfo;
export function getChainInfo(
  chainId: SupportedL2ChainId,
  featureFlags?: Record<
    ChainId | SupportedL1ChainId | SupportedL2ChainId | number,
    boolean
  >,
): L2ChainInfo;
export function getChainInfo(
  chainId: ChainId,
  featureFlags?: Record<
    ChainId | SupportedL1ChainId | SupportedL2ChainId | number,
    boolean
  >,
): L1ChainInfo | L2ChainInfo;
export function getChainInfo(
  chainId:
    | ChainId
    | SupportedL1ChainId
    | SupportedL2ChainId
    | number
    | undefined,
  featureFlags?: Record<
    ChainId | SupportedL1ChainId | SupportedL2ChainId | number,
    boolean
  >,
): L1ChainInfo | L2ChainInfo | undefined;

/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * ChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
export function getChainInfo(
  chainId: any,
  featureFlags?: Record<
    ChainId | SupportedL1ChainId | SupportedL2ChainId | number,
    boolean
  >,
): any {
  if (featureFlags && chainId in featureFlags) {
    return featureFlags[chainId] ? CHAIN_INFO[chainId] : undefined;
  }
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined;
  }
  return undefined;
}

const MAINNET_INFO = CHAIN_INFO[ChainId.DEGEN];

export function getChainInfoOrDefault(
  chainId: number | undefined,
  featureFlags?: Record<number, boolean>,
) {
  return getChainInfo(chainId, featureFlags) ?? MAINNET_INFO;
}
