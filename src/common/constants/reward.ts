export const MAINNET_REWARDS_TOKEN_ID = {
  AVAX: 1,
  GoGoPool: 2,
  USDC_arb: 3,
  POL: 4,
  USDT0_arb: 5,
  SEI: 6,
} as const;

export const TESTNET_REWARDS_TOKEN_ID = {
  AVAX: 128,
  USDC_base_sep: 129,
} as const;

export const REWARDS_TYPE = {
  V1: "V1",
  V2: "V2",
} as const;
