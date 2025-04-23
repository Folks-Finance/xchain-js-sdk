import { getContract } from "viem";

import { SPOKE_CHAIN } from "../../../../common/constants/chain.js";
import { ChainType } from "../../../../common/types/chain.js";
import { TokenType } from "../../../../common/types/token.js";
import { convertFromGenericAddress } from "../../../../common/utils/address.js";
import { BridgeRouterSpokeAbi } from "../constants/abi/bridge-router-spoke-abi.js";
import { SpokeCommonAbi } from "../constants/abi/spoke-common-abi.js";
import { SpokeRewardsV2CommonAbi } from "../constants/abi/spoke-rewards-v2-common-abi.js";
import { SpokeTokenAbi } from "../constants/abi/spoke-token-abi.js";

import type { GenericAddress } from "../../../../common/types/address.js";
import type { FolksChainId, NetworkType } from "../../../../common/types/chain.js";
import type { FolksTokenId } from "../../../../common/types/token.js";
import type { GetReadContractReturnType } from "../../common/types/contract.js";
import type { Client, GetContractReturnType, WalletClient } from "viem";

export function getSpokeCommonContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof SpokeCommonAbi>;
export function getSpokeCommonContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof SpokeCommonAbi, Client>;
export function getSpokeCommonContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof SpokeCommonAbi> | GetContractReturnType<typeof SpokeCommonAbi, Client> {
  return getContract({
    abi: SpokeCommonAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getBridgeRouterSpokeContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof BridgeRouterSpokeAbi>;
export function getBridgeRouterSpokeContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof BridgeRouterSpokeAbi, Client>;
export function getBridgeRouterSpokeContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof BridgeRouterSpokeAbi> {
  return getContract({
    abi: BridgeRouterSpokeAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getSpokeTokenContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof SpokeTokenAbi>;
export function getSpokeTokenContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof SpokeTokenAbi, Client>;
export function getSpokeTokenContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof SpokeTokenAbi> | GetContractReturnType<typeof SpokeTokenAbi, Client> {
  return getContract({
    abi: SpokeTokenAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getSpokeRewardsV2CommonContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof SpokeRewardsV2CommonAbi>;
export function getSpokeRewardsV2CommonContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof SpokeRewardsV2CommonAbi, Client>;
export function getSpokeRewardsV2CommonContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
):
  | GetReadContractReturnType<typeof SpokeRewardsV2CommonAbi>
  | GetContractReturnType<typeof SpokeRewardsV2CommonAbi, Client> {
  return getContract({
    abi: SpokeRewardsV2CommonAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getSpokeEvmTokenAddress(network: NetworkType, folksChainId: FolksChainId, folksTokenId: FolksTokenId) {
  const spokeToken = SPOKE_CHAIN[network][folksChainId]?.tokens[folksTokenId]?.token;
  if (!spokeToken)
    throw new Error(
      `Spoke token not found for network: ${network}, folksChainId: ${folksChainId}, folksTokenId: ${folksTokenId}`,
    );
  if (spokeToken.type === TokenType.NATIVE)
    throw new Error(
      `Spoke token is native for network: ${network}, folksChainId: ${folksChainId}, folksTokenId: ${folksTokenId}`,
    );
  return convertFromGenericAddress(spokeToken.address, ChainType.EVM);
}
