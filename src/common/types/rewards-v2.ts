import type { GenericAddress } from "./address.js";
import type { RewardsTokenId } from "./rewards.js";
import type { Erc20SpokeTokenType, NativeTokenType } from "./token.js";

export type FolksSpokeRewardTokenType = Erc20SpokeTokenType | NativeTokenType;

export type SpokeRewardTokenData = {
  rewardTokenId: RewardsTokenId;
  spokeAddress: GenericAddress;
  token: FolksSpokeRewardTokenType;
};
