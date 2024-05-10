export const DEGEN_LIST = "https://www.proxyswap.fun/tokens.json";

export const UNSUPPORTED_LIST_URLS: string[] = [];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [DEGEN_LIST];

export const DEFAULT_INACTIVE_LIST_URLS: string[] = [DEGEN_LIST];

export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...DEFAULT_ACTIVE_LIST_URLS,
  ...DEFAULT_INACTIVE_LIST_URLS,
];
