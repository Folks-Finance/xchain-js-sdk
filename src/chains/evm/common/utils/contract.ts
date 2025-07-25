import {
  BaseError,
  ContractFunctionRevertedError,
  encodeAbiParameters,
  getContract,
  keccak256,
  padHex,
  toHex,
} from "viem";

import { FOLKS_CHAIN_ID } from "../../../../common/constants/chain.js";
import { ChainType, NetworkType } from "../../../../common/types/chain.js";
import { MAINNET_FOLKS_TOKEN_ID } from "../../../../common/types/token.js";
import { convertFromGenericAddress } from "../../../../common/utils/address.js";
import { getSpokeEvmTokenAddress } from "../../spoke/utils/contract.js";
import { CCIPDataAdapterAbi } from "../constants/abi/ccip-data-adapter-abi.js";
import { ERC20Abi } from "../constants/abi/erc-20-abi.js";
import { USDtEthereumAbi } from "../constants/abi/usdt-eth-abi.js";
import { WormholeDataAdapterAbi } from "../constants/abi/wormhole-data-adapter-abi.js";
import { IWormholeRelayerAbi } from "../constants/abi/wormhole-relayer-abi.js";

import { getEvmSignerAccount, getEvmSignerAddress } from "./chain.js";

import type { EvmAddress, GenericAddress } from "../../../../common/types/address.js";
import type { GetReadContractReturnType } from "../types/contract.js";
import type { Client, GetContractReturnType, Hex, WalletClient } from "viem";

export function getERC20Contract(
  provider: Client,
  genericAddress: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof ERC20Abi | typeof USDtEthereumAbi, Client> {
  const address = convertFromGenericAddress<ChainType.EVM>(genericAddress, ChainType.EVM);
  const abi =
    address === getSpokeEvmTokenAddress(NetworkType.MAINNET, FOLKS_CHAIN_ID.ETHEREUM, MAINNET_FOLKS_TOKEN_ID.USDT_eth)
      ? USDtEthereumAbi
      : ERC20Abi;

  return getContract({
    abi,
    address,
    client: { wallet: signer, public: provider },
  });
}

export async function sendERC20Approve(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
  spender: EvmAddress,
  amount: bigint,
): Promise<Hex | null> {
  const erc20 = getERC20Contract(provider, address, signer);
  const allowance = await erc20.read.allowance([getEvmSignerAddress(signer), spender]);

  // approve if not enough
  if (allowance < amount)
    return await erc20.write.approve([spender, BigInt(amount)], {
      account: getEvmSignerAccount(signer),
      chain: signer.chain,
    });
  return null;
}

export function getWormholeRelayerContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof IWormholeRelayerAbi>;
export function getWormholeRelayerContract(
  provider: Client,
  address: GenericAddress,
  signer: WalletClient,
): GetContractReturnType<typeof IWormholeRelayerAbi, Client>;
export function getWormholeRelayerContract(
  provider: Client,
  address: GenericAddress,
  signer?: WalletClient,
): GetReadContractReturnType<typeof IWormholeRelayerAbi> | GetContractReturnType<typeof IWormholeRelayerAbi, Client> {
  return getContract({
    abi: IWormholeRelayerAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { wallet: signer, public: provider },
  });
}

export function getWormholeDataAdapterContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof WormholeDataAdapterAbi> {
  return getContract({
    abi: WormholeDataAdapterAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { public: provider },
  });
}

export function getCCIPDataAdapterContract(
  provider: Client,
  address: GenericAddress,
): GetReadContractReturnType<typeof CCIPDataAdapterAbi> {
  return getContract({
    abi: CCIPDataAdapterAbi,
    address: convertFromGenericAddress<ChainType.EVM>(address, ChainType.EVM),
    client: { public: provider },
  });
}

export function extractRevertErrorName(err: unknown): string | undefined {
  if (err instanceof BaseError) {
    const revertError = err.walk((err) => err instanceof ContractFunctionRevertedError);
    if (revertError instanceof ContractFunctionRevertedError && revertError.data?.errorName) {
      return revertError.data.errorName;
    }
  }
}

export function encodeErc20AccountData(data: { isFrozen: boolean; amount: bigint }) {
  const bitFlag = data.isFrozen ? 1n : 0n;
  const packed = (data.amount << 8n) | bitFlag;
  return padHex(toHex(packed), { size: 32 });
}

export function getBalanceOfSlotHash(address: EvmAddress, slot: bigint) {
  return keccak256(encodeAbiParameters([{ type: "address" }, { type: "uint256" }], [address, slot]));
}

export function getAllowanceSlotHash(owner: EvmAddress, spender: EvmAddress, slot: bigint) {
  return keccak256(
    encodeAbiParameters(
      [{ type: "address" }, { type: "bytes32" }],
      [spender, keccak256(encodeAbiParameters([{ type: "address" }, { type: "uint256" }], [owner, slot]))],
    ),
  );
}
