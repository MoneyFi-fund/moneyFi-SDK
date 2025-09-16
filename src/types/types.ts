
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
  total_value: Number;
  idle_asset_value: Number;
  total_deposited_liquidity: Number;
  cumulative_yield_profits: Number;
  total_monetized_balance: Number;
  pending_yield_earnings: Number;
  total_withdrawn_liquidity: Number;
  apr_avg: Number;
}

export type ReqWithdrawPayload = {
  signature: String,
  pubkey: String,
  message: String
}

export type TxnStatus = "done" | "failed" | "pending";

export type WithdrawStatusResponse = {
  status: TxnStatus | null;
}

export type AptosFunctionId = `${string}::${string}::${string}`;