import type { EvmFolksChainId } from "./chain.js";
import type { EvmAddress } from "../../../../common/types/address.js";
import type { RewardsTokenId } from "../../../../common/types/rewards.js";
import type { FolksTokenId as LendingTokenId, TokenType } from "../../../../common/types/token.js";

export type Erc20ContractSlot = {
  balanceOf: bigint;
  allowance: bigint;
};

export type AllowanceStateOverride = {
  erc20Address: EvmAddress;
  stateDiff: Array<{
    owner: EvmAddress;
    spender: EvmAddress;
    folksChainId: EvmFolksChainId;
    folksTokenId: LendingTokenId;
    tokenType: TokenType;
    amount: bigint;
  }>;
};

export type BalanceOfStateOverride = {
  erc20Address: EvmAddress;
  stateDiff: Array<{
    owner: EvmAddress;
    folksChainId: EvmFolksChainId;
    folksTokenId: LendingTokenId | RewardsTokenId;
    tokenType: TokenType;
    amount: bigint;
  }>;
};
