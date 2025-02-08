import type { GenericAddress } from "./address.js";
import type { AdapterType } from "./message.js";
import type { SpokeRewardTokenData } from "./rewards-v2.js";
import type { RewardsTokenId } from "./rewards.js";
import type { FolksTokenId, SpokeTokenData } from "./token.js";
import type { EvmChainName } from "../../chains/evm/common/types/chain.js";
import type { FOLKS_CHAIN_ID, MAINNET_FOLKS_CHAIN_ID, TESTNET_FOLKS_CHAIN_ID } from "../constants/chain.js";
import type { REWARDS_TYPE } from "../constants/reward.js";

export enum ChainType {
  EVM = "EVM",
}

export enum NetworkType {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
}

export type SpokeRewardsV2 = {
  spokeRewardsCommonAddress: GenericAddress;
  tokens: Partial<Record<RewardsTokenId, SpokeRewardTokenData>>;
};

export type SpokeRewardsMap = {
  bridgeRouterAddress: GenericAddress;
  adapters: Partial<Record<AdapterType, GenericAddress>>;
  [REWARDS_TYPE.V1]?: undefined;
  [REWARDS_TYPE.V2]?: SpokeRewardsV2;
};

export type FolksChainName = EvmChainName;
export type MainnetFolksChainId = (typeof MAINNET_FOLKS_CHAIN_ID)[keyof typeof MAINNET_FOLKS_CHAIN_ID];
export type TestnetFolksChainId = (typeof TESTNET_FOLKS_CHAIN_ID)[keyof typeof TESTNET_FOLKS_CHAIN_ID];
export type FolksChainId = (typeof FOLKS_CHAIN_ID)[keyof typeof FOLKS_CHAIN_ID];

export type IFolksChain = {
  folksChainId: FolksChainId;
};

export type FolksChain = {
  chainName: string;
  chainType: ChainType;
  chainId: number | string | undefined;
  network: NetworkType;
} & IFolksChain;

export type SpokeChain = {
  spokeCommonAddress: GenericAddress;
  bridgeRouterAddress: GenericAddress;
  adapters: Partial<Record<AdapterType, GenericAddress>>;
  tokens: Partial<Record<FolksTokenId, SpokeTokenData>>;
  rewards: SpokeRewardsMap;
} & IFolksChain;
