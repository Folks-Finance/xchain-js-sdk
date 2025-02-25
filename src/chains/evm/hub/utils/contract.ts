import { getContract } from "viem";

import { ChainType } from "../../../../common/types/chain.js";
import { convertFromGenericAddress } from "../../../../common/utils/address.js";
import { AccountManagerAbi } from "../constants/abi/account-manager-abi.js";
import { BridgeRouterHubAbi } from "../constants/abi/bridge-router-hub-abi.js";
import { HubAbi } from "../constants/abi/hub-abi.js";
import { HubPoolAbi } from "../constants/abi/hub-pool-abi.js";
import { HubRewardsV1Abi } from "../constants/abi/hub-rewards-v1-abi.js";
import { HubRewardsV2Abi } from "../constants/abi/hub-rewards-v2-abi.js";
import { LoanManagerAbi } from "../constants/abi/loan-manager-abi.js";
import { NodeManagerAbi } from "../constants/abi/node-manager-abi.js";
import { OracleManagerAbi } from "../constants/abi/oracle-manager-abi.js";

import type { GenericAddress } from "../../../../common/types/address.js";
import type { GetReadContractReturnType } from "../../common/types/contract.js";
import type { Client, GetContractReturnType, WalletClient } from "viem";

export function getAccountManagerContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof AccountManagerAbi> {
  return getContract({
    abi: AccountManagerAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getBridgeRouterHubContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof BridgeRouterHubAbi>;
export function getBridgeRouterHubContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof BridgeRouterHubAbi, Client>;
export function getBridgeRouterHubContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof BridgeRouterHubAbi> | GetContractReturnType<typeof BridgeRouterHubAbi, Client> {
  return getContract({
    abi: BridgeRouterHubAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getHubPoolContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof HubPoolAbi> {
  return getContract({
    abi: HubPoolAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { public: provider },
  });
}

export function getLoanManagerContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof LoanManagerAbi>;
export function getLoanManagerContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof LoanManagerAbi, Client>;
export function getLoanManagerContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof LoanManagerAbi> | GetContractReturnType<typeof LoanManagerAbi, Client> {
  return getContract({
    abi: LoanManagerAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getOracleManagerContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof OracleManagerAbi> {
  return getContract({
    abi: OracleManagerAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { public: provider },
  });
}

export function getNodeManagerContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof NodeManagerAbi> {
  return getContract({
    abi: NodeManagerAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { public: provider },
  });
}

export function getHubRewardsV1Contract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof HubRewardsV1Abi>;
export function getHubRewardsV1Contract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof HubRewardsV1Abi, Client>;
export function getHubRewardsV1Contract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof HubRewardsV1Abi> | GetContractReturnType<typeof HubRewardsV1Abi, Client> {
  return getContract({
    abi: HubRewardsV1Abi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getHubRewardsV2Contract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof HubRewardsV2Abi>;
export function getHubRewardsV2Contract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof HubRewardsV2Abi, Client>;
export function getHubRewardsV2Contract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof HubRewardsV2Abi> | GetContractReturnType<typeof HubRewardsV2Abi, Client> {
  return getContract({
    abi: HubRewardsV2Abi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getHubContract(provider: Client, address: GenericAddress): GetReadContractReturnType<typeof HubAbi>;
export function getHubContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof HubAbi, Client>;
export function getHubContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof HubAbi> | GetContractReturnType<typeof HubAbi, Client> {
  return getContract({
    abi: HubAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}
