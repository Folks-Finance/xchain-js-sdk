import type { GenericAddress } from "./address.js";
import type { Erc20SpokeTokenType, NativeTokenType } from "./token.js";
import type { RewardsTokenId } from "../constants/reward.js";

export type FolksSpokeRewardTokenType = Erc20SpokeTokenType | NativeTokenType;

export type SpokeRewardTokenData = {
  rewardTokenId: RewardsTokenId;
  spokeAddress: GenericAddress;
  token: FolksSpokeRewardTokenType;
};
