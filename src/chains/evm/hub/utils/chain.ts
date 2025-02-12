import { REWARDS_TYPE } from "../../../../common/constants/reward.js";
import { HUB_CHAIN } from "../constants/chain.js";

import type { GenericAddress } from "../../../../common/types/address.js";
import type { FolksChainId, NetworkType } from "../../../../common/types/chain.js";
import type { LoanTypeId } from "../../../../common/types/lending.js";
import type { AdapterType } from "../../../../common/types/message.js";
import type { RewardsTokenId, RewardsType } from "../../../../common/types/rewards.js";
import type { FolksTokenId } from "../../../../common/types/token.js";
import type { HubChain } from "../types/chain.js";
import type { HubRewardTokenData } from "../types/rewards-v2.js";
import type { HubTokenData } from "../types/token.js";

export function isHubChain(folksChainId: FolksChainId, network: NetworkType): boolean {
  return HUB_CHAIN[network].folksChainId === folksChainId;
}

export function getHubChain(network: NetworkType): HubChain {
  return HUB_CHAIN[network];
}

export function getHubTokensData(network: NetworkType): Partial<Record<FolksTokenId, HubTokenData>> {
  return HUB_CHAIN[network].tokens;
}

export function getHubTokenData(folksTokenId: FolksTokenId, network: NetworkType): HubTokenData {
  const token = HUB_CHAIN[network].tokens[folksTokenId];
  if (!token) throw new Error(`Hub token not found for folksTokenId: ${folksTokenId}`);
  return token;
}

export function getHubRewardAddress(network: NetworkType, rewardsType: RewardsType): GenericAddress {
  return HUB_CHAIN[network].rewards[rewardsType].hubAddress;
}

export function getHubRewardsV2TokensData(network: NetworkType): Partial<Record<RewardsTokenId, HubRewardTokenData>> {
  return HUB_CHAIN[network].rewards[REWARDS_TYPE.V2].tokens;
}

export function getHubRewardsV2TokenData(rewardTokenId: RewardsTokenId, network: NetworkType): HubRewardTokenData {
  const token = HUB_CHAIN[network].rewards[REWARDS_TYPE.V2].tokens[rewardTokenId];
  if (!token) throw new Error(`RewardsV2 token not found for rewardTokenId: ${rewardTokenId}`);
  return token;
}

export function isLoanTypeSupported(loanType: LoanTypeId, folksTokenId: FolksTokenId, network: NetworkType): boolean {
  const token = getHubTokenData(folksTokenId, network);
  return token.supportedLoanTypes.has(loanType);
}

export function assertLoanTypeSupported(loanType: LoanTypeId, folksTokenId: FolksTokenId, network: NetworkType): void {
  if (!isLoanTypeSupported(loanType, folksTokenId, network))
    throw new Error(`Loan type ${loanType} is not supported for folksTokenId: ${folksTokenId}`);
}

export function getHubChainAdapterAddress(network: NetworkType, adapterType: AdapterType, isRewards = false) {
  const hubChain = getHubChain(network);
  const { adapters } = isRewards ? hubChain.rewards : hubChain;
  const adapterAddress = adapters[adapterType];
  if (adapterAddress) return adapterAddress;
  throw new Error(`Adapter ${adapterType} not found for hub chain ${hubChain.folksChainId}`);
}

export function getHubChainBridgeRouterAddress(hubChain: HubChain, isRewards = false) {
  const { bridgeRouterAddress } = isRewards ? hubChain.rewards : hubChain;
  return bridgeRouterAddress;
}
