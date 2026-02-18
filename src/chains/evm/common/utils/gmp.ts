import { concat, encodeAbiParameters, keccak256, numberToHex, parseSignature } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import { UINT16_LENGTH, UINT256_LENGTH } from "../../../../common/constants/bytes.js";
import { convertNumberToBytes } from "../../../../common/utils/bytes.js";
import { WORMHOLE_SIGNATURE_RECOVERY_MAGIC } from "../constants/gmp.js";

import {
  getWormholeGuardianAddressSlotHash,
  getWormholeGuardianSetIndexSlotHash,
  getWormholeGuardiansLenSlotHash,
} from "./contract.js";

import type { EvmAddress, GenericAddress } from "../../../../common/types/address.js";
import type { WormholeGuardiansData } from "../../../../common/types/gmp.js";
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
  wormholeTargetChainId: number | bigint,
  returnAdapterId: AdapterType,
  returnGasLimit: bigint,
  sender: GenericAddress,
  handler: GenericAddress,
  payload: Hex,
): Hex {
  return concat([
    convertNumberToBytes(wormholeTargetChainId, UINT16_LENGTH),
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
  wormholeGuardiansData: WormholeGuardiansData,
  sourceWormholeChainId: number,
  sourceWormholeExecutorDataAdapterAddress: GenericAddress,
  consistencyLevel: Finality,
  payload: Hex,
  vaaVersion = 1,
): Promise<{ digest: Hex; vaa: Hex }> {
  const sequence = 0;
  const body = concat([
    numberToHex(0, { size: 4 }), // timestamp
    numberToHex(0, { size: 4 }), // nonce
    numberToHex(sourceWormholeChainId, { size: 2 }),
    sourceWormholeExecutorDataAdapterAddress,
    numberToHex(sequence, { size: 8 }),
    numberToHex(consistencyLevel, { size: 1 }),
    payload,
  ]);
  const {
    mocks: { mnemonic, guardianSetIndex, guardiansSetLength },
  } = wormholeGuardiansData;
  const digest = keccak256(keccak256(body));

  const sig = await mnemonicToAccount(mnemonic).sign({ hash: digest });
  const parsedSig = parseSignature(sig);

  const signatureBytes = concat([
    parsedSig.r,
    parsedSig.s,
    numberToHex(Number(parsedSig.v) - WORMHOLE_SIGNATURE_RECOVERY_MAGIC, { size: 1 }),
  ]);

  const signaturesBytes = concat([
    numberToHex(guardiansSetLength, { size: 1 }),
    numberToHex(0, { size: 1 }), // 0 is the index of the guardian that signed
    signatureBytes,
  ]);

  const header = concat([
    numberToHex(vaaVersion, { size: 1 }),
    numberToHex(guardianSetIndex, { size: 4 }),
    signaturesBytes,
  ]);

  const vaa = concat([header, body]);
  return { digest, vaa };
}

export function getGuardianSetStateOverride(
  wormholeCore: EvmAddress,
  wormholeGuardiansData: WormholeGuardiansData,
): StateOverride {
  const {
    mocks: { address, guardianSetIndex, guardiansSetLength },
  } = wormholeGuardiansData;
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
