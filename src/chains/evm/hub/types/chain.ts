import type { HubRewardTokenData as RewardTokenDataV2 } from "./rewards-v2.js";
import type { HubTokenData } from "./token.js";
import type { RewardsTokenId } from "../../../../common/constants/reward.js";
import type { GenericAddress } from "../../../../common/types/address.js";
import type { IFolksChain } from "../../../../common/types/chain.js";
import type { AdapterType } from "../../../../common/types/message.js";
import type { FolksTokenId } from "../../../../common/types/token.js";

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
  rewardsV1: {
    hubAddress: GenericAddress;
  };
  rewardsV2: {
    hubAddress: GenericAddress;
    spokeManagerAddress: GenericAddress;
    tokens: Partial<Record<RewardsTokenId, RewardTokenDataV2>>;
  };
} & IFolksChain;
