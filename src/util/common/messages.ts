import { Hex, concat, isHex } from "viem";
import { UINT16_LENGTH, UINT256_LENGTH } from "../../constants/common";
import { Action, GenericAddress, MessageAdapters, MessageParams, SpokeTokenData, TokenType } from "../../type/common";
import { HubTokenData } from "../../type/hub";
import { AddressUtil } from "./address";
import { BytesUtil } from "./bytes";

export namespace MessageUtil {
  export const DEFAULT_MESSAGE_PARAMS = (adapters: MessageAdapters): MessageParams => ({
    ...adapters,
    receiverValue: BigInt(0),
    gasLimit: BigInt(30000),
    returnGasLimit: BigInt(0),
  });

  export function buildMessagePayload(action: Action, accountId: Hex, userAddr: GenericAddress, data: string): Hex {
    if (!AddressUtil.isGenericAddress(accountId)) throw Error("Unknown account id format");
    if (!AddressUtil.isGenericAddress(userAddr)) throw Error("Unknown user address format");
    if (!isHex(data)) throw Error("Unknown data format");

    return concat([BytesUtil.convertNumberToBytes(action, UINT16_LENGTH), accountId, userAddr, data]);
  }

  export function extraArgsToBytes(tokenAddr: GenericAddress, recipientAddr: GenericAddress, amount: bigint): Hex {
    if (!AddressUtil.isGenericAddress(tokenAddr)) throw Error("Unknown token address format");
    if (!AddressUtil.isGenericAddress(recipientAddr)) throw Error("Unknown recipient address format");

    return concat(["0x1b366e79", tokenAddr, recipientAddr, BytesUtil.convertNumberToBytes(amount, UINT256_LENGTH)]);
  }

  export function getSendTokenExtraArgsWhenAdding(
    spokeTokenData: SpokeTokenData,
    hubTokenData: HubTokenData,
    amount: bigint
  ): Hex {
    if (spokeTokenData.tokenType === TokenType.NATIVE) return "0x";
    return extraArgsToBytes(spokeTokenData.tokenAddress, hubTokenData.poolAddress, amount);
  }

  export function getSendTokenExtraArgsWhenRemoving(
    spokeTokenData: SpokeTokenData,
    hubTokenData: HubTokenData,
    amount: bigint
  ): Hex {
    if (spokeTokenData.tokenType === TokenType.NATIVE) return "0x";
    return extraArgsToBytes(hubTokenData.tokenAddress, spokeTokenData.spokeAddress, BigInt(amount));
  }
}
