import type { MAINNET_REWARDS_TOKEN_ID, REWARDS_TYPE, TESTNET_REWARDS_TOKEN_ID } from "../constants/reward.js";

export type RewardsType = (typeof REWARDS_TYPE)[keyof typeof REWARDS_TYPE];

export type TestnetRewardsTokenId = (typeof TESTNET_REWARDS_TOKEN_ID)[keyof typeof TESTNET_REWARDS_TOKEN_ID];
export type MainnetRewardsTokenId = (typeof MAINNET_REWARDS_TOKEN_ID)[keyof typeof MAINNET_REWARDS_TOKEN_ID];

export type RewardsTokenId = MainnetRewardsTokenId | TestnetRewardsTokenId;
