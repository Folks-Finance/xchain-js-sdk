import type { HubRewardTokenData as RewardTokenDataV2 } from "./rewards-v2.js";
import type { HubTokenData } from "./token.js";
import type { REWARDS_TYPE } from "../../../../common/constants/reward.js";
import type { GenericAddress } from "../../../../common/types/address.js";
import type { IFolksChain } from "../../../../common/types/chain.js";
import type { AdapterType } from "../../../../common/types/message.js";
import type { RewardsTokenId } from "../../../../common/types/rewards.js";
import type { FolksTokenId } from "../../../../common/types/token.js";

type HubRewardsV1 = {
  hubAddress: GenericAddress;
};

type HubRewardsV2 = {
  hubAddress: GenericAddress;
  spokeManagerAddress: GenericAddress;
  tokens: Partial<Record<RewardsTokenId, RewardTokenDataV2>>;
};

export type HubRewardsMap = {
  bridgeRouterAddress: GenericAddress;
  adapters: Partial<Record<AdapterType, GenericAddress>>;
  [REWARDS_TYPE.V1]: HubRewardsV1;
  [REWARDS_TYPE.V2]: HubRewardsV2;
};

export type HubChain = {
  hubAddress: GenericAddress;
  bridgeRouterAddress: GenericAddress;
  adapters: Record<AdapterType, GenericAddress>;
  nodeManagerAddress: GenericAddress;
  oracleManagerAddress: GenericAddress;
  spokeManagerAddress: GenericAddress;
  accountManagerAddress: GenericAddress;
  loanManagerAddress: GenericAddress;
  tokens: Partial<Record<FolksTokenId, HubTokenData>>;
  rewards: HubRewardsMap;
} & IFolksChain;
