import type { NodeId } from "./oracle.js";
import type { AdapterType } from "../../../../common/types/message.js";
import type { RewardsTokenId } from "../../../../common/types/rewards.js";
import type { Erc20HubTokenType, FolksTokenId, NativeTokenType } from "../../../../common/types/token.js";
import type { Dnum } from "dnum";

export type FolksHubRewardTokenType = Erc20HubTokenType | NativeTokenType;

export type HubRewardTokenData = {
  rewardTokenId: RewardsTokenId;
  nodeId: NodeId;
  token: FolksHubRewardTokenType;
};

export type EpochReward = {
  rewardTokenId: RewardsTokenId;
  totalRewards: bigint;
};

export type Epoch = {
  poolId: number;
  epochIndex: number;
  startTimestamp: bigint;
  endTimestamp: bigint;
  rewards: Array<EpochReward>;
};

export type PoolEpoch = {
  poolId: number;
  epochIndex: number;
};

export type ReceiveRewardToken = {
  rewardTokenId: RewardsTokenId;
  returnAdapterId: AdapterType;
  returnGasLimit: bigint;
};

export type Epochs = Partial<Record<FolksTokenId, Array<Epoch>>>;

export type ActiveEpochs = Partial<Record<FolksTokenId, Epoch>>;

export type ActiveEpochReward = {
  remainingRewards: bigint;
  rewardsApr: Dnum;
};

export type ActiveEpochInfo = {
  rewardsInfo: Partial<Record<RewardsTokenId, ActiveEpochReward>>;
  totalRewardsApr: Dnum;
} & Epoch;

export type ActiveEpochsInfo = Partial<Record<FolksTokenId, ActiveEpochInfo>>;

export type UnclaimedRewards = Partial<Record<RewardsTokenId, bigint>>;

export type PendingRewards = Partial<Record<FolksTokenId, Partial<Record<RewardsTokenId, bigint>>>>;

export type LastUpdatedPointsForRewards = Partial<
  Record<
    FolksTokenId,
    {
      lastWrittenPoints: bigint;
      writtenEpochPoints: bigint;
    }
  >
>;
