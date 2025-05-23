import type { OraclePrice } from "./oracle.js";
import type { PoolInfo } from "./pool.js";
import type { AccountId, LoanId, LoanTypeId } from "../../../../common/types/lending.js";
import type { FolksTokenId } from "../../../../common/types/token.js";
import type { GetEventParams, GetReadContractReturnType } from "../../common/types/contract.js";
import type { LoanManagerAbi } from "../constants/abi/loan-manager-abi.js";
import type { Dnum } from "dnum";
import type { ReadContractReturnType } from "viem";

export type LoanPoolInfo = {
  folksTokenId: FolksTokenId;
  poolId: number;
  collateralUsed: bigint; // in f token
  borrowUsed: bigint; // in token
  collateralCap: bigint; // $ amount
  borrowCap: bigint; // $ amount
  collateralFactor: Dnum;
  borrowFactor: Dnum;
  liquidationBonus: Dnum;
  liquidationFee: Dnum;
  isDeprecated: boolean;
  reward: {
    minimumAmount: bigint; // in token
    collateralSpeed: Dnum;
    borrowSpeed: Dnum;
    collateralRewardIndex: Dnum;
    borrowRewardIndex: Dnum;
  };
};

export type LoanTypeInfo = {
  loanTypeId: LoanTypeId;
  deprecated: boolean;
  loanTargetHealth: Dnum;
  pools: Partial<Record<FolksTokenId, LoanPoolInfo>>;
};

export type PoolsPoints = {
  collateral: bigint;
  borrow: bigint;
  interestPaid: bigint;
};

export type UserPoints = {
  accountId: AccountId;
  poolsPoints: Partial<Record<FolksTokenId, PoolsPoints>>;
};

export type UserLoanInfoCollateral = {
  folksTokenId: FolksTokenId;
  poolId: number;
  tokenDecimals: number;
  oraclePrice: OraclePrice;
  collateralFactor: Dnum;
  fTokenBalance: bigint;
  tokenBalance: bigint;
  balanceValue: Dnum;
  effectiveBalanceValue: Dnum;
  interestRate: Dnum;
  interestYield: Dnum;
};

export type UserLoanInfoBorrow = {
  folksTokenId: FolksTokenId;
  poolId: number;
  tokenDecimals: number;
  oraclePrice: OraclePrice;
  isStable: boolean;
  borrowFactor: Dnum;
  borrowedAmount: bigint;
  borrowedAmountValue: Dnum;
  borrowBalance: bigint;
  borrowBalanceValue: Dnum;
  effectiveBorrowBalanceValue: Dnum;
  accruedInterest: bigint;
  accruedInterestValue: Dnum;
  interestRate: Dnum;
  interestYield: Dnum;
};

export type UserLoanInfo = {
  loanId: LoanId;
  loanTypeId: LoanTypeId;
  accountId: AccountId;
  collaterals: Partial<Record<FolksTokenId, UserLoanInfoCollateral>>;
  borrows: Partial<Record<FolksTokenId, UserLoanInfoBorrow>>;
  netRate: Dnum;
  netYield: Dnum;
  totalCollateralBalanceValue: Dnum;
  totalBorrowedAmountValue: Dnum;
  totalBorrowBalanceValue: Dnum;
  totalEffectiveCollateralBalanceValue: Dnum;
  totalEffectiveBorrowBalanceValue: Dnum;
  loanToValueRatio: Dnum;
  borrowUtilisationRatio: Dnum;
  liquidationMargin: Dnum;
};

export type AssetsAdditionalInterest = Partial<
  Record<
    FolksTokenId,
    {
      additionalRate: Dnum;
      additionalYield: Dnum;
    }
  >
>;

export type CreateUserLoanEventParams = GetEventParams & {
  loanManager: GetReadContractReturnType<typeof LoanManagerAbi>;
  accountId: AccountId;
  loanTypeIds?: Array<LoanTypeId>;
};

export type DeleteUserLoanEventParams = GetEventParams & {
  loanManager: GetReadContractReturnType<typeof LoanManagerAbi>;
  accountId: AccountId;
};

export type LoanManagerUserLoanAbi = ReadContractReturnType<typeof LoanManagerAbi, "getUserLoan">;

export type LoanManagerUserLoanCollateral = LoanManagerUserLoanAbi[4][0];
export type LoanManagerUserLoanBorrow = LoanManagerUserLoanAbi[5][0];

export type LoanManagerUserLoan = {
  accountId: AccountId;
  loanTypeId: LoanTypeId;
  colPools: Array<number>;
  borPools: Array<number>;
  userLoanCollateral: Array<LoanManagerUserLoanCollateral>;
  userLoanBorrow: Array<LoanManagerUserLoanBorrow>;
};

export enum LoanChangeType {
  AddCollateral,
  ReduceCollateral,
  Borrow,
  Repay,
  SwitchBorrowType,
}

type LoanBaseChange = {
  type: LoanChangeType;
  poolInfo: PoolInfo;
};

type LoanAddCollateralChange = LoanBaseChange & {
  type: LoanChangeType.AddCollateral;
  fTokenAmount: bigint;
};

type LoanReduceCollateralChange = LoanBaseChange & {
  type: LoanChangeType.ReduceCollateral;
  fTokenAmount: bigint;
};

type LoanBorrowChange = LoanBaseChange & {
  type: LoanChangeType.Borrow;
  tokenAmount: bigint;
  isStable: boolean;
};

type LoanRepayChange = LoanBaseChange & {
  type: LoanChangeType.Repay;
  tokenAmount: bigint;
};

type LoanSwitchBorrowTypeChange = LoanBaseChange & {
  type: LoanChangeType.SwitchBorrowType;
  isSwitchingToStable: boolean;
};

export type LoanChange =
  | LoanAddCollateralChange
  | LoanReduceCollateralChange
  | LoanBorrowChange
  | LoanRepayChange
  | LoanSwitchBorrowTypeChange;
