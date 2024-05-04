export const UNI_LIST =
  "https://raw.githubusercontent.com/KetanKudikyal/universal-router-sdk/main/tokens.json";
export const UNI_EXTENDED_LIST =
  "https://cloudflare-ipfs.com/ipns/extendedtokens.uniswap.org";
const UNI_UNSUPPORTED_LIST =
  "https://cloudflare-ipfs.com/ipns/unsupportedtokens.uniswap.org";
const BA_LIST =
  "https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json";
// TODO(WEB-2282): Re-enable CMC list once we have a better solution for handling large lists.
// const CMC_ALL_LIST = 'https://s3.coinmarketcap.com/generated/dex/tokens/eth-tokens-all.json'

export const OPTIMISM_LIST =
  "https://static.optimism.io/optimism.tokenlist.json";
export const ARBITRUM_LIST = "https://bridge.arbitrum.io/token-list-42161.json";
export const CELO_LIST =
  "https://celo-org.github.io/celo-token-list/celo.tokenlist.json";
export const PLASMA_BNB_LIST =
  "https://raw.githubusercontent.com/plasmadlt/plasma-finance-token-list/master/bnb.json";
export const AVALANCHE_LIST =
  "https://raw.githubusercontent.com/ava-labs/avalanche-bridge-resources/main/token_list.json";
export const BASE_LIST =
  "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json";

export const DEGEN_LIST = "https://www.proxyswap.fun/tokens.json";

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST, UNI_UNSUPPORTED_LIST];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [DEGEN_LIST];

export const DEFAULT_INACTIVE_LIST_URLS: string[] = [DEGEN_LIST];

export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...DEFAULT_ACTIVE_LIST_URLS,
  ...DEFAULT_INACTIVE_LIST_URLS,
];
