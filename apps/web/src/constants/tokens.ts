import {
  ChainId,
  Currency,
  Ether,
  NativeCurrency,
  Token,
  UNI_ADDRESSES,
  WETH9,
} from "@uniswap/sdk-core";
import invariant from "tiny-invariant";

export const NATIVE_CHAIN_ID = "NATIVE";

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
export const DEFAULT_ERC20_DECIMALS = 18;

export const USDC_MAINNET = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6,
  "USDC",
  "USD//C",
);

export const USDC_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  6,
  "USDC",
  "USD//C",
);
export const USDC_OPTIMISM_GOERLI = new Token(
  ChainId.OPTIMISM_GOERLI,
  "0xe05606174bac4A6364B31bd0eCA4bf4dD368f8C6",
  6,
  "USDC",
  "USD//C",
);
export const USDC_ARBITRUM = new Token(
  ChainId.ARBITRUM_ONE,
  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  6,
  "USDC",
  "USD//C",
);
export const USDC_ARBITRUM_GOERLI = new Token(
  ChainId.ARBITRUM_GOERLI,
  "0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892",
  6,
  "USDC",
  "USD//C",
);
export const USDC_POLYGON = new Token(
  ChainId.POLYGON,
  "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
  6,
  "USDC",
  "USD Coin",
);
export const USDC_POLYGON_MUMBAI = new Token(
  ChainId.POLYGON_MUMBAI,
  "0x0fa8781a83e46826621b3bc094ea2a0212e71b23",
  6,
  "USDC",
  "USD Coin",
);
export const PORTAL_USDC_CELO = new Token(
  ChainId.CELO,
  "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd",
  6,
  "USDCet",
  "USDC (Portal from Ethereum)",
);
export const USDC_BASE = new Token(
  ChainId.BASE,
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  6,
  "USDC",
  "USD Coin",
);

export const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin",
);
export const DAI_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  18,
  "DAI",
  "Dai stable coin",
);
export const DAI_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  18,
  "DAI",
  "Dai stable coin",
);
export const MATIC_MAINNET = new Token(
  ChainId.MAINNET,
  "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  18,
  "MATIC",
  "Polygon Matic",
);
export const MATIC_POLYGON = new Token(
  ChainId.POLYGON,
  "0x0000000000000000000000000000000000001010",
  18,
  "MATIC",
  "Matic",
);
export const DAI_POLYGON = new Token(
  ChainId.POLYGON,
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  18,
  "DAI",
  "Dai Stablecoin",
);

export const USDT_POLYGON = new Token(
  ChainId.POLYGON,
  "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  6,
  "USDT",
  "Tether USD",
);
export const WBTC_POLYGON = new Token(
  ChainId.POLYGON,
  "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  8,
  "WBTC",
  "Wrapped BTC",
);
export const USDT = new Token(
  ChainId.MAINNET,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  6,
  "USDT",
  "Tether USD",
);
export const USDT_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  6,
  "USDT",
  "Tether USD",
);
export const USDT_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  6,
  "USDT",
  "Tether USD",
);
export const WBTC = new Token(
  ChainId.MAINNET,
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  8,
  "WBTC",
  "Wrapped BTC",
);
export const WBTC_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
  8,
  "WBTC",
  "Wrapped BTC",
);
export const WBTC_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
  8,
  "WBTC",
  "Wrapped BTC",
);
export const WETH_POLYGON_MUMBAI = new Token(
  ChainId.POLYGON_MUMBAI,
  "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
  18,
  "WETH",
  "Wrapped Ether",
);

export const WETH_POLYGON = new Token(
  ChainId.POLYGON,
  "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  18,
  "WETH",
  "Wrapped Ether",
);
export const USDT_DEGEN = new Token(
  ChainId.DEGEN,
  "0x5929EA210d6976Dae365774DA409ab4b866Fab82",
  18,
  "USDT",
  "USD//C",
);

export const CUSD_CELO = new Token(
  ChainId.CELO,
  "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  18,
  "cUSD",
  "Celo Dollar",
);
export const CEUR_CELO = new Token(
  ChainId.CELO,
  "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
  18,
  "cEUR",
  "Celo Euro Stablecoin",
);
export const PORTAL_ETH_CELO = new Token(
  ChainId.CELO,
  "0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207",
  18,
  "ETH",
  "Portal Ether",
);
export const WBTC_CELO = new Token(
  ChainId.CELO,
  "0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF",
  18,
  "WBTC",
  "Wrapped BTC",
);
const CELO_CELO_ALFAJORES = new Token(
  ChainId.CELO_ALFAJORES,
  "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
  18,
  "CELO",
  "Celo",
);
export const CUSD_CELO_ALFAJORES = new Token(
  ChainId.CELO_ALFAJORES,
  "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  18,
  "CUSD",
  "Celo Dollar",
);
export const CEUR_CELO_ALFAJORES = new Token(
  ChainId.CELO_ALFAJORES,
  "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F",
  18,
  "CEUR",
  "Celo Euro Stablecoin",
);

export const USDC_BSC = new Token(
  ChainId.BNB,
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  18,
  "USDC",
  "USDC",
);
export const USDT_BSC = new Token(
  ChainId.BNB,
  "0x55d398326f99059fF775485246999027B3197955",
  18,
  "USDT",
  "USDT",
);
export const ETH_BSC = new Token(
  ChainId.BNB,
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  18,
  "ETH",
  "Ethereum",
);
export const BTC_BSC = new Token(
  ChainId.BNB,
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  18,
  "BTCB",
  "BTCB",
);
export const BUSD_BSC = new Token(
  ChainId.BNB,
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  18,
  "BUSD",
  "BUSD",
);
export const DAI_BSC = new Token(
  ChainId.BNB,
  "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  18,
  "DAI",
  "DAI",
);

export const USDC_AVALANCHE = new Token(
  ChainId.AVALANCHE,
  "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  6,
  "USDC",
  "USDC Token",
);
export const USDT_AVALANCHE = new Token(
  ChainId.AVALANCHE,
  "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  6,
  "USDT",
  "Tether USD",
);
export const WETH_AVALANCHE = new Token(
  ChainId.AVALANCHE,
  "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
  18,
  "WETH",
  "Wrapped Ether",
);
export const DAI_AVALANCHE = new Token(
  ChainId.AVALANCHE,
  "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  18,
  "DAI.e",
  "Dai.e Token",
);

export const UNI: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    UNI_ADDRESSES[ChainId.MAINNET],
    18,
    "UNI",
    "Uniswap",
  ),
  [ChainId.GOERLI]: new Token(
    ChainId.GOERLI,
    UNI_ADDRESSES[ChainId.GOERLI],
    18,
    "UNI",
    "Uniswap",
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    UNI_ADDRESSES[ChainId.SEPOLIA],
    18,
    "UNI",
    "Uniswap",
  ),
};

export const ARB = new Token(
  ChainId.ARBITRUM_ONE,
  "0x912CE59144191C1204E64559FE8253a0e49E6548",
  18,
  "ARB",
  "Arbitrum",
);

export const OP = new Token(
  ChainId.OPTIMISM,
  "0x4200000000000000000000000000000000000042",
  18,
  "OP",
  "Optimism",
);

export const LDO = new Token(
  ChainId.MAINNET,
  "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
  18,
  "LDO",
  "Lido DAO Token",
);
export const NMR = new Token(
  ChainId.MAINNET,
  "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
  18,
  "NMR",
  "Numeraire",
);
export const MNW = new Token(
  ChainId.MAINNET,
  "0xd3E4Ba569045546D09CF021ECC5dFe42b1d7f6E4",
  18,
  "MNW",
  "Morpheus.Network",
);

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } =
  {
    ...(WETH9 as Record<ChainId, Token>),
    [ChainId.DEGEN]: new Token(
      ChainId.DEGEN,
      "0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387",
      18,
      "wDEGEN",
      "Wrapped DEGEN",
    ),
  };

export function isCelo(
  chainId: number,
): chainId is ChainId.CELO | ChainId.CELO_ALFAJORES {
  return chainId === ChainId.CELO_ALFAJORES || chainId === ChainId.CELO;
}
export function isPolygon(
  chainId: number,
): chainId is ChainId.POLYGON | ChainId.POLYGON_MUMBAI {
  return chainId === ChainId.POLYGON_MUMBAI || chainId === ChainId.POLYGON;
}

export function isDegen(chainId: number): chainId is ChainId.DEGEN {
  return chainId === ChainId.DEGEN;
}

export function isBsc(chainId: number): chainId is ChainId.BNB {
  return chainId === ChainId.BNB;
}

export function isAvalanche(chainId: number): chainId is ChainId.AVALANCHE {
  return chainId === ChainId.AVALANCHE;
}

class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (wrapped) return wrapped;
    throw new Error(`Unsupported chain ID: ${this.chainId}`);
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

export class DegenNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isDegen(this.chainId)) throw new Error("Not degen");
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    invariant(wrapped instanceof Token);
    return wrapped;
  }

  public constructor(chainId: number) {
    if (!isDegen(chainId)) throw new Error("Not eth");
    super(chainId, 18, "DEGEN", "Degen");
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {};

export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId];
  let nativeCurrency: NativeCurrency | Token;
  if (isDegen(chainId)) {
    nativeCurrency = new DegenNativeCurrency(chainId);
  } else {
    nativeCurrency = ExtendedEther.onChain(chainId);
  }
  return (cachedNativeCurrency[chainId] = nativeCurrency);
}

export const TOKEN_SHORTHANDS: {
  [shorthand: string]: { [chainId in ChainId]?: string };
} = {
  USDC: {
    [ChainId.DEGEN]: USDT_DEGEN.address,
  },
};
