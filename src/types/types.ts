export type User = {
  id: number;
  created_at: string;
  address: string;
  ref_code: string;
  ref_by: string | null;
  network: string;
  is_partnership: boolean;
};

export type UserStatistic = {
  total_value: Number;
  idle_asset_value: Number;
  total_deposited_liquidity: Number;
  cumulative_yield_profits: Number;
  total_monetized_balance: Number;
  pending_yield_earnings: Number;
  total_withdrawn_liquidity: Number;
  apr_avg: Number;
  apy_avg: Number;
  referral_balance: Number;
};

export type ReqWithdrawPayloadAptos = {
  signature: String;
  pubkey: String;
  message: String;
};

export type TxnStatus = "done" | "failed" | "pending";

export type WithdrawStatusResponse = {
  status: TxnStatus | null;
};

export type SupportedChains = {
  evm: string[];
  aptos: string;
};

export type TokenInfo = {
  name: string;
  chain: string;
  address: string;
  token_decimals: string;
};

export type SupportedTokens = {
  tokens: TokenInfo[];
};

export type CreateUserPayload = {
  user_address: CrossChainAddress;
};

export type CrossChainAddress = { Evm: string } | { Aptos: string };

export type TxInitializationWalletAccountParam = {
  user_address: CrossChainAddress;
};

export type HasWalletAccountParam = {
  sender: string;
};

export type GetMaxQuoteParam = {
  sender: string;
};

export type GetWalletAccountAssetsParam = {
  sender: string;
};

export type GetWalletAccountAssetsResponse = {
  token_address: string;
  withdraw_amount: number;
};
export type GetWalletAccountAssetsResponses = {
  data: GetWalletAccountAssetsResponse[]
};

export type GetMaxQuotesResponse = {
  chain_id: string;
  usdt: number;
  usdc: number;
};

export type GetMaxQuotesResponses = {
  data: GetMaxQuotesResponse[];
};

export type UserStaticsParam = {
  address: string;
};

export type TxPayloadWithdrawResponse = {
  tx: string;
};

export type TxPayloadDepositParam = TxDepositAptosPayload | TxDepositEvmPayload;

export type TxPayloadDepositResponse = TxPayloadDepositResponseEVM | TxPayloadDepositResponseAptos;

export type ReqWithdrawPayload = WithdrawRequestAptosPayload | WithdrawRequestEvmPayload;

export type TxReqWithdrawResponse = TxReqWithdrawResponseEVM | void;
export interface GetUserAssetAllocationResponse {
  balance_by_chain: BalanceByChain[];
  balance_by_protocol: BalanceByProtocol[];
  balance_by_token: BalanceByToken[];
}

export type GetBridgeStatusResponse = {
  address: string, 
  status_transfer_fund: BridgeStatus, 
  status_withdraw_fund: BridgeStatus, 
}

export type TxPayloadDepositResponseAptos = {
  tx: string;
};

export type TxPayloadDepositResponseEVM = {
  tx: string;
  evm_contract_address: string;
};

export enum BridgeStatus {
    Done = "done", 
    Failed = "failed", 
    Pending = "pending",
}

export enum PayloadType {
  Aptos = "Aptos",
  Evm = "Evm",
}

export type TxPayloadWithdrawParam = {
  sender: string;
  chain_id: number;
  token_address: string;
  amount: bigint;
};

export type TxDepositAptosPayload = {
  type: PayloadType;
  sender: string;
  token_address: string;
  amount: number;
};

export type TxDepositEvmPayload = {
  type: PayloadType;
  token_address: string;
  amount: string;
  chain_id: number;
  target_chain: number;
};

export type WithdrawRequestAptosPayload = {
  type: PayloadType;
  address: string;
  payload: ReqWithdrawPayloadAptos;
};

export type WithdrawRequestEvmPayload = {
  type: PayloadType;
  chain_id: number;
  token_address: string;
  amount: number;
};

export type TxReqWithdrawResponseEVM = {
  tx: string;
  target_chain: number;
  evm_contract_address: String;
};

export interface BalanceByChain {
  chain: string;
  balance: number;
}

export interface BalanceByToken {
  token: string;
  chain: string;
  balance: number;
}

export interface BalanceByProtocol {
  protocol: string;
  balance: number;
}

export type GetUserAssetBalanceParam = {
  sender: string;
  chain_id: number;
  token?: string;
}

export type GetUserAssetBalanceResponse = {
  balance: number;
}