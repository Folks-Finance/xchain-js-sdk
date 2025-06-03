import { encodeAbiParameters } from "viem";

import { FOLKS_CHAIN_ID } from "../../../../common/constants/chain.js";
import { NetworkType } from "../../../../common/types/chain.js";
import { MAINNET_FOLKS_TOKEN_ID } from "../../../../common/types/token.js";
import { getSpokeEvmTokenAddress } from "../../spoke/utils/contract.js";
import { CONTRACT_SLOT } from "../constants/tokens.js";

import { encodeErc20AccountData, getAllowanceSlotHash, getBalanceOfSlotHash } from "./contract.js";

import type { EvmAddress } from "../../../../common/types/address.js";
import type { RewardsTokenId } from "../../../../common/types/rewards.js";
import type { FolksTokenId as LendingTokenId } from "../../../../common/types/token.js";
import type { EvmFolksChainId } from "../types/chain.js";
import type { AllowanceStateOverride, BalanceOfStateOverride } from "../types/tokens.js";
import type { StateOverride } from "viem";

export function getContractSlot(folksChainId: EvmFolksChainId) {
  const contractSlot = CONTRACT_SLOT[folksChainId];
  if (!contractSlot) {
    throw new Error(`Contract slot not found for folksChainId: ${folksChainId}`);
  }
  return contractSlot;
}

export function getFolksTokenContractSlot(
  folksChainId: EvmFolksChainId,
  folksTokenId: LendingTokenId | RewardsTokenId,
) {
  const contractSlot = getContractSlot(folksChainId);

  const folksTokenContractSlot = contractSlot.erc20[folksTokenId];
  if (!folksTokenContractSlot) {
    throw new Error(`Contract slot not found for folksTokenId: ${folksTokenId}`);
  }
  return folksTokenContractSlot;
}

export function getAllowanceStateOverride(allowanceStatesOverride: Array<AllowanceStateOverride>): StateOverride {
  return allowanceStatesOverride.map((aso) => ({
    address: aso.erc20Address,
    stateDiff: aso.stateDiff.map((sd) => ({
      slot: getAllowanceSlotHash(
        sd.owner,
        sd.spender,
        getFolksTokenContractSlot(sd.folksChainId, sd.folksTokenId).allowance,
      ),
      value: encodeAbiParameters([{ type: "uint256" }], [sd.amount]),
    })),
  }));
}

function encodeBalanceOfValue(amount: bigint, erc20Address?: EvmAddress) {
  // aUSD_ava
  if (
    erc20Address &&
    erc20Address ===
      getSpokeEvmTokenAddress(NetworkType.MAINNET, FOLKS_CHAIN_ID.AVALANCHE, MAINNET_FOLKS_TOKEN_ID.aUSD_ava)
  )
    return encodeErc20AccountData({ isFrozen: false, amount });
  return encodeAbiParameters([{ type: "uint256" }], [amount]);
}

export function getBalanceOfStateOverride(balanceOfStatesOverride: Array<BalanceOfStateOverride>): StateOverride {
  return balanceOfStatesOverride.map((bso) => ({
    address: bso.erc20Address,
    stateDiff: bso.stateDiff.map((sd) => ({
      slot: getBalanceOfSlotHash(sd.owner, getFolksTokenContractSlot(sd.folksChainId, sd.folksTokenId).balanceOf),
      value: encodeBalanceOfValue(sd.amount, bso.erc20Address),
    })),
  }));
}
