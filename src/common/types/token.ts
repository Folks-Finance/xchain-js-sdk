import type { GenericAddress } from "./address.js";
import type { AdapterType } from "./message.js";

export const MAINNET_FOLKS_TOKEN_ID = {
  USDC: "USDC",
  AVAX: "AVAX",
  sAVAX: "sAVAX",
  ETH_eth: "ETH_eth",
  ETH_base: "ETH_base",
  wETH_ava: "wETH_ava",
  wBTC_eth: "wBTC_eth",
  BTCb_ava: "BTCb_ava",
  cbBTC_base: "cbBTC_base",
  BNB: "BNB",
  ETHB_bsc: "ETHB_bsc",
  BTCB_bsc: "BTCB_bsc",
  ETH_arb: "ETH_arb",
  ARB: "ARB",
  SolvBTC: "SolvBTC",
  JOE: "JOE",
  ggAVAX: "ggAVAX",
  POL: "POL",
  wBTC_pol: "wBTC_pol",
  wETH_pol: "wETH_pol",
  aUSD_ava: "aUSD_ava",
  savUSD: "savUSD",
  wBTC_arb: "wBTC_arb",
  tBTC_arb: "tBTC_arb",
  wstETH_arb: "wstETH_arb",
  weETH_arb: "weETH_arb",
  rsETH_arb: "rsETH_arb",
  wstETH_pol: "wstETH_pol",
  LINK_pol: "LINK_pol",
  MaticX: "MaticX",
  ATH_eth: "ATH_eth",
  pyUSD_eth: "pyUSD_eth",
  rlUSD_eth: "rlUSD_eth",
  wstETH_eth: "wstETH_eth",
  weETH_eth: "weETH_eth",
  AERO_base: "AERO_base",
  cbETH_base: "cbETH_base",
  wstETH_base: "wstETH_base",
  weETH_base: "weETH_base",
  VIRTUAL_base: "VIRTUAL_base",
  KAITO_base: "KAITO_base",
  aUSD_pol: "aUSD_pol",
  USDT_ava: "USDT_ava",
  USDT_eth: "USDT_eth",
  USDT_pol: "USDT_pol",
  USDT0_arb: "USDT0_arb",
  SEI: "SEI",
  iSEI: "iSEI",
  USDT0_sei: "USDT0_sei",
  wETH_sei: "wETH_sei",
  wBTC_sei: "wBTC_sei",
} as const;
export type MainnetFolksTokenId = (typeof MAINNET_FOLKS_TOKEN_ID)[keyof typeof MAINNET_FOLKS_TOKEN_ID];

export const TESTNET_FOLKS_TOKEN_ID = {
  USDC: "USDC",
  AVAX: "AVAX",
  ETH_eth_sep: "ETH_eth_sep",
  ETH_base_sep: "ETH_base_sep",
  ETH_arb_sep: "ETH_arb_sep",
  LINK_eth_sep: "LINK_eth_sep",
  BNB: "BNB",
  CCIP_BnM: "CCIP_BnM",
  MON: "MON",
  sMON: "sMON",
  aprMON: "aprMON",
  gMON: "gMON",
  shMON: "shMON",
  SEI: "SEI",
} as const;
export type TestnetFolksTokenId = (typeof TESTNET_FOLKS_TOKEN_ID)[keyof typeof TESTNET_FOLKS_TOKEN_ID];

export type FolksTokenId = MainnetFolksTokenId | TestnetFolksTokenId;

export enum TokenType {
  NATIVE = "NATIVE",
  ERC20 = "ERC20",
  CROSS_CHAIN = "CROSS_CHAIN",
}

export type ITokenData = {
  folksTokenId: FolksTokenId;
};

export type Erc20SpokeTokenType = {
  type: TokenType.ERC20;
  address: GenericAddress;
  decimals: number;
};

export type Erc20HubTokenType = {
  type: TokenType.ERC20;
  decimals: number;
};

export type CrossChainTokenType = {
  type: TokenType.CROSS_CHAIN;
  adapters: Array<AdapterType>;
  address: GenericAddress;
  decimals: number;
};

export type NativeTokenType = {
  type: TokenType.NATIVE;
  decimals: number;
};

export type FolksSpokeTokenType = Erc20SpokeTokenType | CrossChainTokenType | NativeTokenType;
export type FolksHubTokenType = Erc20HubTokenType | CrossChainTokenType | NativeTokenType;

export type SpokeTokenData = {
  poolId: number;
  spokeAddress: GenericAddress;
  token: FolksSpokeTokenType;
} & ITokenData;
