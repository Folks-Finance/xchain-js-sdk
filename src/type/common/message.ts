import type { Hex } from "viem";
import { FINALITY } from "../../constants/common/index.js";
import type { GenericAddress } from "./chain.js";

export enum AdapterType {
  HUB = 1,
  WORMHOLE_DATA = 2,
  WORMHOLE_CCTP = 3,
  CCIP_DATA = 4,
  CCIP_TOKEN = 5,
}

export enum Action {
  // SPOKE -> HUB
  CreateAccount,
  InviteAddress,
  AcceptInviteAddress,
  UnregisterAddress,
  AddDelegate,
  RemoveDelegate,
  CreateLoan,
  DeleteLoan,
  Deposit,
  DepositFToken,
  Withdraw,
  WithdrawFToken,
  Borrow,
  Repay,
  RepayWithCollateral,
  Liquidate,
  SwitchBorrowType,
  // HUB -> SPOKE
  SendToken,
}

export type Finality = (typeof FINALITY)[keyof typeof FINALITY];

export interface MessageAdapters {
  adapterId: AdapterType;
  returnAdapterId: AdapterType;
}

export interface MessageParams extends MessageAdapters {
  receiverValue: bigint;
  gasLimit: bigint;
  returnGasLimit: bigint;
}

export interface MessageToSend {
  params: MessageParams;
  sender: GenericAddress;
  destinationChainId: number;
  handler: GenericAddress;
  payload: Hex;
  finalityLevel: Finality;
  extraArgs: Hex;
}
