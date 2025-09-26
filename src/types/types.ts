
export type ChainSetting = {
  client_url: string;
  chain_id: number
};

export type MoneyFiConfig = {
  chains: ChainSetting[];
  integration_code: string;
  api_key: string; 
}

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
  referral_reward: Number; 
}

export type ReqWithdrawPayload = {
  signature: string,
  pubkey: string,
  message: string, 
  to_chain_id: number; 
  from_chain_id: number[];
}

export type TxnStatus = "done" | "failed" | "pending";

export type WithdrawStatusResponse = {
  status: TxnStatus | null;
}

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
}

export type CrossChainAddress =
  | { Evm: string }
  | { Aptos: string };

export type TxInitializationWalletAccountParam = {
  user_address: CrossChainAddress;
};

export type HasWalletAccountParam = {
  sender: string;
}

export type TxPayloadDepositParam = {
  sender: string;      
  chain_id: number;      
  token_address: string; 
  amount: bigint;      
}

export type TxPayloadWithdrawParam = {
  sender: string;      
  chain_id: number;
  token_address: string; 
  amount: bigint;      
}

export type TxPayloadReferralRewardWithdrawParam = {
  sender: string;      
  chain_id: number;
  token_address: string; 
  amount: bigint;      
}

export type GetQuoteParam = {
  sender: string;      
  to_chain_ids: number[];
}

export type UserStaticsParam = {
  address: string;
  chain_ids: number[];
}

export type TxPayloadWithdrawResponse = {
  tx: string;   
}

export type TxPayloadDepositResponse = {
  tx: string;   
}

export type TxPayloadReferralRewardWithdrawResponse = {
  tx: string;   
}


export type GetQuoteResponse = {
  list_quote: {
    chain_id: number; 
    token_address: string; 
    amount: number;
  }
}