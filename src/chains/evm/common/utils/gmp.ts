import { concat, encodeAbiParameters, keccak256, numberToHex, parseSignature } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import {
  UINT128_LENGTH,
  UINT16_LENGTH,
  UINT256_LENGTH,
  UINT32_LENGTH,
  UINT64_LENGTH,
  UINT8_LENGTH,
} from "../../../../common/constants/bytes.js";
import { convertNumberToBytes } from "../../../../common/utils/bytes.js";
import { WORMHOLE_SIGNATURE_RECOVERY_MAGIC } from "../constants/gmp.js";

import {
  getWormholeGuardianAddressSlotHash,
  getWormholeGuardianSetIndexSlotHash,
  getWormholeGuardiansLenSlotHash,
} from "./contract.js";

import type { EvmAddress, GenericAddress } from "../../../../common/types/address.js";
import type { MockWormholeGuardiansData } from "../../../../common/types/gmp.js";
import type { AdapterType, Finality } from "../../../../common/types/message.js";
import type { RetryMessageExtraArgs, ReverseMessageExtraArgs } from "../types/gmp.js";
import type { Hex, StateOverride } from "viem";

export function encodeEvmPayloadWithMetadata(
  returnAdapterId: AdapterType,
  returnGasLimit: bigint,
  sender: GenericAddress,
  handler: GenericAddress,
  payload: Hex,
): Hex {
  return concat([
    convertNumberToBytes(returnAdapterId, UINT16_LENGTH),
    convertNumberToBytes(returnGasLimit, UINT256_LENGTH),
    sender,
    handler,
    payload,
  ]);
}

export function encodeEvmPayloadWithWormholeExecutorMetadata(
  wormholeTargetChainId: number,
  receiverValue: bigint,
  returnAdapterId: AdapterType,
  returnGasLimit: bigint,
  sender: GenericAddress,
  handler: GenericAddress,
  payload: Hex,
): Hex {
  return concat([
    convertNumberToBytes(wormholeTargetChainId, UINT16_LENGTH),
    convertNumberToBytes(receiverValue, UINT128_LENGTH),
    encodeEvmPayloadWithMetadata(returnAdapterId, returnGasLimit, sender, handler, payload),
  ]);
}

export function encodeRetryMessageExtraArgs(extraArgs?: RetryMessageExtraArgs): Hex {
  if (extraArgs === undefined) return "0x";
  const { returnAdapterId, returnGasLimit } = extraArgs;
  return concat([
    convertNumberToBytes(returnAdapterId, UINT16_LENGTH),
    convertNumberToBytes(returnGasLimit, UINT256_LENGTH),
  ]);
}

export function encodeReverseMessageExtraArgs(extraArgs?: ReverseMessageExtraArgs): Hex {
  if (extraArgs === undefined) return "0x";
  const { accountId, returnAdapterId, returnGasLimit } = extraArgs;
  return concat([
    accountId,
    convertNumberToBytes(returnAdapterId, UINT16_LENGTH),
    convertNumberToBytes(returnGasLimit, UINT256_LENGTH),
  ]);
}

export async function encodeWormholeVAA(
  mockWormholeGuardiansData: MockWormholeGuardiansData,
  sourceWormholeChainId: number,
  sourceWormholeExecutorDataAdapterAddress: GenericAddress,
  consistencyLevel: Finality,
  payload: Hex,
  vaaVersion = 1,
): Promise<{ digest: Hex; vaa: Hex }> {
  const sequence = 0;
  const body = concat([
    numberToHex(0, { size: UINT32_LENGTH }), // timestamp
    numberToHex(0, { size: UINT32_LENGTH }), // nonce
    numberToHex(sourceWormholeChainId, { size: UINT16_LENGTH }),
    sourceWormholeExecutorDataAdapterAddress,
    numberToHex(sequence, { size: UINT64_LENGTH }),
    numberToHex(consistencyLevel, { size: UINT8_LENGTH }),
    payload,
  ]);
  const { mnemonic, guardianSetIndex, guardiansSetLength } = mockWormholeGuardiansData;
  const digest = keccak256(keccak256(body));

  const sig = await mnemonicToAccount(mnemonic).sign({ hash: digest });
  const parsedSig = parseSignature(sig);

  const header = concat([
    numberToHex(vaaVersion, { size: UINT8_LENGTH }),
    numberToHex(guardianSetIndex, { size: UINT32_LENGTH }),
    numberToHex(guardiansSetLength, { size: UINT8_LENGTH }),
    numberToHex(0, { size: UINT8_LENGTH }), // 0 is the index of the guardian that signed
    parsedSig.r,
    parsedSig.s,
    numberToHex(Number(parsedSig.v) - WORMHOLE_SIGNATURE_RECOVERY_MAGIC, { size: UINT8_LENGTH }),
  ]);

  const vaa = concat([header, body]);
  return { digest, vaa };
}

export function getGuardianSetStateOverride(
  wormholeCore: EvmAddress,
  mockWormholeGuardiansData: MockWormholeGuardiansData,
): StateOverride {
  const { address, guardianSetIndex, guardiansSetLength } = mockWormholeGuardiansData;
  return [
    {
      address: wormholeCore,
      stateDiff: [
        {
          slot: getWormholeGuardianSetIndexSlotHash(),
          value: encodeAbiParameters([{ type: "uint256" }], [0n]),
        },
        {
          slot: getWormholeGuardiansLenSlotHash(BigInt(guardianSetIndex)),
          value: encodeAbiParameters([{ type: "uint256" }], [BigInt(guardiansSetLength)]),
        },
        ...Array.from({ length: guardiansSetLength }, (_, i) => ({
          slot: getWormholeGuardianAddressSlotHash(BigInt(i), BigInt(guardianSetIndex)),
          value: encodeAbiParameters([{ type: "address" }], [address]),
        })),
      ],
    },
  ];
}
