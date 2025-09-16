
import { AccountAddressInput } from "@aptos-labs/ts-sdk";

export type MoneyFiSetting = {
  readonly customRpcUrl?: string;
};

export type CreateUser = {
  user_address: { "Aptos": AccountAddressInput };
  ref_by?: string;
  is_partnership: boolean;
}

export type User = {
  id: number;
  created_at: Date;
  address: string;
  ref_code: string;
  network: string;
  is_partnership: boolean;
}

export type UserStatistic = {
  total_value: BigInt;
  idle_asset_value: BigInt;
  total_deposited_liquidity: BigInt;
  cumulative_yield_profits: BigInt;
  total_monetized_balance: BigInt;
  pending_yield_earnings: BigInt;
  total_withdrawn_liquidity: BigInt;
  apr_avg: BigInt;
}

export type UserAnalytics = {
  readonly totalValue: BigInt;
  readonly totalMonetizedBalance: BigInt;
  readonly idleAssetValue: BigInt;
  readonly pendingYeildEarings: BigInt;
  readonly totalDepositedLiquidity: BigInt;
  readonly totalWithdrawLiquidity: BigInt;
  readonly cumlativeYeildProfits: BigInt;
  readonly avgAPR: number;
}

export type AptosFunctionId = `${string}::${string}::${string}`;