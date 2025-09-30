import { HUB_CHAIN } from "../../chains/evm/hub/constants/chain.js";
import { NetworkType } from "../types/chain.js";
import { MAINNET_LOAN_TYPE_ID, TESTNET_LOAN_TYPE_ID } from "../types/lending.js";
import { TokenType } from "../types/token.js";

import type { LoanTypeId } from "../types/lending.js";
import type { FolksTokenId } from "../types/token.js";

const MAINNET_CROSS_CHAIN_FOLKS_TOKEN_ID: Array<FolksTokenId> = Object.values(HUB_CHAIN.MAINNET.tokens)
  .filter((hubToken) => hubToken.token.type === TokenType.CROSS_CHAIN)
  .map((hubToken) => hubToken.folksTokenId);

const TESTNET_CROSS_CHAIN_FOLKS_TOKEN_ID: Array<FolksTokenId> = Object.values(HUB_CHAIN.TESTNET.tokens)
  .filter((hubToken) => hubToken.token.type === TokenType.CROSS_CHAIN)
  .map((hubToken) => hubToken.folksTokenId);

export const CROSS_CHAIN_FOLKS_TOKEN_ID: Array<FolksTokenId> = [
  ...MAINNET_CROSS_CHAIN_FOLKS_TOKEN_ID,
  ...TESTNET_CROSS_CHAIN_FOLKS_TOKEN_ID,
];

export const FOLKS_TOKEN_IDS_BY_LOAN_TYPE: Record<NetworkType, Partial<Record<LoanTypeId, Array<FolksTokenId>>>> = {
  [NetworkType.MAINNET]: Object.fromEntries(
    Object.values(MAINNET_LOAN_TYPE_ID).map((loanType) => [
      loanType,
      Object.values(HUB_CHAIN.MAINNET.tokens)
        .filter((token) => token.supportedLoanTypes.has(loanType))
        .map((token) => token.folksTokenId),
    ]),
  ),
  [NetworkType.TESTNET]: Object.fromEntries(
    Object.values(TESTNET_LOAN_TYPE_ID).map((loanType) => [
      loanType,
      Object.values(HUB_CHAIN.TESTNET.tokens)
        .filter((token) => token.supportedLoanTypes.has(loanType))
        .map((token) => token.folksTokenId),
    ]),
  ),
};
