import type {
  PrepareCreateAccountCall as PrepareCreateAccountEVMCall,
  PrepareInviteAddressCall as PrepareInviteAddressEVMCall,
  PrepareAcceptInviteAddressCall as PrepareAcceptInviteAddressEVMCall,
  PrepareUnregisterAddressCall as PrepareUnregisterAddressEVMCall,
  PrepareCreateLoanCall as PrepareCreateLoanEVMCall,
  PrepareDeleteLoanCall as PrepareDeleteLoanEVMCall,
  PrepareCreateLoanAndDepositCall as PrepareCreateLoanAndDepositEVMCall,
  PrepareDepositCall as PrepareDepositEVMCall,
  PrepareWithdrawCall as PrepareWithdrawEVMCall,
  PrepareCall as PrepareEVMCall,
  PrepareBorrowCall as PrepareBorrowEVMCall,
  PrepareRepayCall as PrepareRepayEVMCall,
  PrepareRepayWithCollateralCall as PrepareRepayWithCollateralEVMCall,
  PrepareSwitchBorrowTypeCall as PrepareSwitchBorrowTypeEVMCall,
  PrepareLiquidateCall as PrepareLiquidateEVMCall,
  PrepareUpdateUserPointsInLoansCall as PrepareUpdateUserPointsInLoansEVMCall,
  PrepareRetryMessageCall as PrepareRetryMessageEVMCall,
  PrepareReverseMessageCall as PrepareReverseMessageEVMCall,
  PrepareResendWormholeMessageCall as PrepareResendWormholeMessageEVMCall,
  PrepareUpdateAccountsPointsForRewardsV1Call as PrepareUpdateAccountsPointsForRewardsV1EVMCall,
  PrepareUpdateAccountsPointsForRewardsV2Call as PrepareUpdateAccountsPointsForRewardsV2EVMCall,
  PrepareClaimRewardsV1Call as PrepareClaimRewardsV1EVMCall,
  PrepareClaimRewardsV2Call as PrepareClaimRewardsV2EVMCall,
} from "../../chains/evm/common/types/module.js";

export type PrepareCall = PrepareEVMCall;

export type PrepareCreateAccountCall = PrepareCreateAccountEVMCall;
export type PrepareInviteAddressCall = PrepareInviteAddressEVMCall;
export type PrepareAcceptInviteAddressCall = PrepareAcceptInviteAddressEVMCall;
export type PrepareUnregisterAddressCall = PrepareUnregisterAddressEVMCall;

export type PrepareCreateLoanCall = PrepareCreateLoanEVMCall;
export type PrepareDeleteLoanCall = PrepareDeleteLoanEVMCall;
export type PrepareCreateLoanAndDepositCall = PrepareCreateLoanAndDepositEVMCall;
export type PrepareDepositCall = PrepareDepositEVMCall;
export type PrepareWithdrawCall = PrepareWithdrawEVMCall;
export type PrepareBorrowCall = PrepareBorrowEVMCall;
export type PrepareRepayCall = PrepareRepayEVMCall;
export type PrepareRepayWithCollateralCall = PrepareRepayWithCollateralEVMCall;
export type PrepareSwitchBorrowTypeCall = PrepareSwitchBorrowTypeEVMCall;
export type PrepareLiquidateCall = PrepareLiquidateEVMCall;
export type PrepareUpdateUserPointsInLoansCall = PrepareUpdateUserPointsInLoansEVMCall;
export type PrepareRetryMessageCall = PrepareRetryMessageEVMCall;
export type PrepareReverseMessageCall = PrepareReverseMessageEVMCall;
export type PrepareResendWormholeMessageCall = PrepareResendWormholeMessageEVMCall;
export type PrepareUpdateAccountsPointsForRewardsV1Call = PrepareUpdateAccountsPointsForRewardsV1EVMCall;
export type PrepareUpdateAccountsPointsForRewardsV2Call = PrepareUpdateAccountsPointsForRewardsV2EVMCall;
export type PrepareClaimRewardsV1Call = PrepareClaimRewardsV1EVMCall;
export type PrepareClaimRewardsV2Call = PrepareClaimRewardsV2EVMCall;
