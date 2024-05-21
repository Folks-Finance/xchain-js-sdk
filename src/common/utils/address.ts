import { getAddress, pad, sliceHex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { exhaustiveCheck } from "../../utils/exhaustive-check.js";
import {
  BYTES32_LENGTH,
  EVM_ADDRESS_BYTES_LENGTH,
} from "../constants/index.js";
import { ChainType } from "../types/index.js";

import type { AddressType } from "../types/address.js";
import type { GenericAddress } from "../types/index.js";
import type { Address } from "viem";

export function getRandomGenericAddress(): GenericAddress {
  return pad(privateKeyToAccount(generatePrivateKey()).address, {
    size: BYTES32_LENGTH,
  });
}

export function isGenericAddress(address: GenericAddress): boolean {
  return address.length === 64 + 2 && address.startsWith("0x");
}

export function convertToGenericAddress<T extends ChainType>(
  address: AddressType<T>,
  fromChainType: ChainType,
): GenericAddress {
  switch (fromChainType) {
    case ChainType.EVM:
      return pad(address as Address, { size: BYTES32_LENGTH });
    default:
      return exhaustiveCheck(fromChainType);
  }
}

export function convertFromGenericAddress<T extends ChainType>(
  address: GenericAddress,
  toChainType: ChainType,
): AddressType<T> {
  switch (toChainType) {
    case ChainType.EVM:
      return getAddress(
        sliceHex(address, BYTES32_LENGTH - EVM_ADDRESS_BYTES_LENGTH),
      );
    default:
      return exhaustiveCheck(toChainType);
  }
}
