import type { Branded } from "./brand.js";

export type Nonce = Branded<`0x${string}`, "Nonce">;
export type AccountId = Branded<`0x${string}`, "AccountId">;
export type LoanId = Branded<`0x${string}`, "LoanId">;
export type LoanName = Branded<`0x${string}`, "LoanName">;

export const MAINNET_LOAN_TYPE_ID = {
  DEPOSIT: 1, // no support for borrows
  GENERAL: 2,
  AVAX_EFFICIENCY: 3,
} as const;
export type MainnetLoanTypeId = (typeof MAINNET_LOAN_TYPE_ID)[keyof typeof MAINNET_LOAN_TYPE_ID];

export const TESTNET_LOAN_TYPE_ID = {
  DEPOSIT: 1, // no support for borrows
  GENERAL: 2,
} as const;
export type TestnetLoanTypeId = (typeof TESTNET_LOAN_TYPE_ID)[keyof typeof TESTNET_LOAN_TYPE_ID];

export type LoanTypeId = MainnetLoanTypeId | TestnetLoanTypeId;
