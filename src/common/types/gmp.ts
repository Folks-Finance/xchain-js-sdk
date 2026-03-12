import type { EvmAddress, GenericAddress } from "./address.js";
import type { Branded } from "./brand.js";

export enum MessageDirection {
  SpokeToHub,
  HubToSpoke,
}

export type MockWormholeGuardiansData = {
  guardianSetIndex: number;
  guardiansSetLength: number;
  mnemonic: string;
  address: EvmAddress;
};

export type WormholeExecutorCapability = {
  requestPrefixes: Array<string>;
  maxGasLimit: string;
  maxMsgValue: string;
};

export type WormholeData = {
  wormholeChainId: number;
  wormholeRelayer: GenericAddress;
  wormholeCore: EvmAddress;
};

export type CCIPData = {
  ccipChainId: bigint;
  ccipRouter: GenericAddress;
};

export type MessageId = Branded<`0x${string}`, "MessageId">;
