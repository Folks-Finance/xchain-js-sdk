import type { FolksTokenId } from "../../../../common/types/token.js";
import type { Dnum } from "dnum";

export type Epoch = {
  poolId: number;
  epochIndex: number;
  startTimestamp: bigint;
  endTimestamp: bigint;
  totalRewards: bigint;
};

export type PoolEpoch = {
  poolId: number;
  epochIndex: number;
};

export type Epochs = Partial<Record<FolksTokenId, Array<Epoch>>>;

export type ActiveEpochs = Partial<Record<FolksTokenId, Epoch>>;

export type ActiveEpochInfo = {
  remainingRewards: bigint;
  totalRewardsApr: Dnum;
} & Epoch;

export type ActiveEpochsInfo = Partial<Record<FolksTokenId, ActiveEpochInfo>>;

export type PendingRewards = Partial<Record<FolksTokenId, bigint>>;

export type LastUpdatedPointsForRewards = Partial<
  Record<
    FolksTokenId,
    {
      lastWrittenPoints: bigint;
      writtenEpochPoints: bigint;
    }
  >
>;
