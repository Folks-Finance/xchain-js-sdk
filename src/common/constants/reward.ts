export const MAINNET_REWARDS_TOKEN_ID = {
  AVAX: 1,
} as const;
export type MainnetRewardsTokenId = (typeof MAINNET_REWARDS_TOKEN_ID)[keyof typeof MAINNET_REWARDS_TOKEN_ID];

export const TESTNET_REWARDS_TOKEN_ID = {
  USDC: 1,
  AVAX: 2,
} as const;
export type TestnetRewardsTokenId = (typeof TESTNET_REWARDS_TOKEN_ID)[keyof typeof TESTNET_REWARDS_TOKEN_ID];

export type RewardsTokenId = MainnetRewardsTokenId | TestnetRewardsTokenId;
