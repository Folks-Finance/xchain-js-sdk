import type { EventParams } from "../types/contract.js";

export const defaultEventParams: EventParams = {
  fromBlock: "earliest",
  toBlock: "latest",
  strict: true,
};

export const GAS_LIMIT_ESTIMATE_INCREASE = 10_000n;
export const SEND_TOKEN_ACTION_RETURN_GAS_LIMIT = 500_000n;
export const RECEIVER_VALUE_SLIPPAGE = 0.01;
export const HUB_GAS_LIMIT_SLIPPAGE = 0.1;
export const RETRY_REVERSE_GAS_LIMIT_SLIPPAGE = 0.05;
export const UPDATE_USER_POINTS_IN_LOANS_GAS_LIMIT_SLIPPAGE = 0.1;
export const UPDATE_ACCOUNT_POINTS_FOR_REWARDS_GAS_LIMIT_SLIPPAGE = 0.01;
export const CLAIM_REWARDS_GAS_LIMIT_SLIPPAGE = 0;
