# 📌 MoneyFi SDK API Documentation

This document provides an overview of all API endpoints called within the **MoneyFi SDK** class, along with their purpose, request parameters, and expected responses.

---

## 🔑 Base Info
- **Base Path:** `https://api.moneyfi.fund`
- **Transport:** HTTPS (POST/GET depending on method)
- **Authentication:** `integration_code` passed internally by SDK
- **Headers:** All requests must include the required headers (see [Header Requirements](#headerrequirements))
---

## 📋 API Endpoints

### 1. **Create User**
- **Method:** `POST`
- **Endpoint:** `v1/sdk/create-user`
- **Payload:** [`CreateUserPayload`](#createuserpayload)
- **Response:** [`User`](#user)

---

### 2. **Initialize Wallet Account**
- **Method:** `POST`
- **Endpoint:** `v1/sdk/create-wallet-account`
- **Payload:** [`TxInitializationWalletAccountParam`](#txinitializationwalletaccountparam)
- **Response:** `string` (signed transaction)

---

### 3. **Check Wallet Account Exists**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/has-wallet-account`
- **Params:** [`HasWalletAccountParam`](#haswalletaccountparam)
- **Response:** `boolean`

---

### 4. **Generate Deposit Transaction Payload**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/tx-payload-deposit`
- **Params:** [`TxPayloadDepositParam`](#txpayloadddepositparam)
- **Response:** [`TxPayloadDepositResponse`](#txpayloadddepositresponse)

---

### 5. **Generate Withdraw Transaction Payload**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/tx-payload-withdraw`
- **Params:** [`TxPayloadWithdrawParam`](#txpayloadwithdrawparam)
- **Response:** [`TxPayloadWithdrawResponse`](#txpayloadwithdrawresponse)

---

### 6. **Get User Statistic**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/user-statistic`
- **Params:** [`UserStaticsParam`](#userstaticsparam)
- **Response:** [`UserStatistic`](#userstatistic)

---

### 7. **Request Withdraw**
- **Method:** `POST`
- **Endpoint:** `v1/sdk/req-withdraw?address={address}`
- **Payload:** [`ReqWithdrawPayload`](#reqwithdrawpayload)
- **Response:** `void`

---

### 8. **Get Withdraw Status**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/req-withdraw-status?address={address}`
- **Response:** [`WithdrawStatusResponse`](#withdrawstatusresponse)

---

### 9. **Get Supported Chains**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/get-supported-chains`
- **Response:** [`SupportedChains`](#supportedchains)

---

### 10. **Get Supported Tokens**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/get-supported-tokens`
- **Response:** [`SupportedTokens`](#supportedtokens)

---

### 11. **Get User Information**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/get-user-information?sender={address}`
- **Response:** [`User`](#user)

---

### 12. **Get Max Quote Amount**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/get-max-quote-amount`
- **Params:** [`GetMaxQuoteParam`](#getmaxqouteparam)
- **Response:** [`GetMaxQuotesResponse`](#getmaxqoutesresponse)

---

### 13. **Get Available Assets In Wallet Account**
- **Method:** `GET`
- **Endpoint:** `v1/sdk/get-wallet-account-assets`
- **Params:** [`GetWalletAccountAssetsParam`](#getWalletAccountAssetsParam)
- **Response:** [`GetWalletAccountAssetsResponse`](#getWalletAccountAssetsResponse)

---

## 📦 Types

### `User`
```ts
type User = {
  id: number;
  created_at: string;
  address: string;
  ref_code: string;
  ref_by: string | null;
  network: string;
  is_partnership: boolean;
};
```

### `UserStatistic`
```ts
type UserStatistic = {
  total_value: Number;
  idle_asset_value: Number;
  total_deposited_liquidity: Number;
  cumulative_yield_profits: Number;
  total_monetized_balance: Number;
  pending_yield_earnings: Number;
  total_withdrawn_liquidity: Number;
  apr_avg: Number;
  referral_balance: Number;
}
```

### `ReqWithdrawPayload`
```ts
type ReqWithdrawPayload = {
  signature: String;
  pubkey: String;
  message: String;
}
```

### `TxnStatus`
```ts
type TxnStatus = "done" | "failed" | "pending";
```

### `WithdrawStatusResponse`
```ts
type WithdrawStatusResponse = {
  status: TxnStatus | null;
}
```

### `SupportedChains`
```ts
type SupportedChains = {
  evm: string[];
  aptos: string;
};
```

### `TokenInfo`
```ts
type TokenInfo = {
  name: string;
  chain: string;
  address: string;
  token_decimals: string;
};
```

### `SupportedTokens`
```ts
type SupportedTokens = {
  tokens: TokenInfo[];
};
```

### `CreateUserPayload`
```ts
type CreateUserPayload = {
  user_address: CrossChainAddress;
}
```

### `CrossChainAddress`
```ts
type CrossChainAddress =
  | { Evm: string }
  | { Aptos: string };
```

### `TxInitializationWalletAccountParam`
```ts
type TxInitializationWalletAccountParam = {
  user_address: CrossChainAddress;
};
```

### `HasWalletAccountParam`
```ts
type HasWalletAccountParam = {
  sender: string;
}
```

### `TxPayloadDepositParam`
```ts
type TxPayloadDepositParam = {
  sender: string;
  chain_id: number;
  token_address: string;
  amount: bigint;
}
```

### `TxPayloadWithdrawParam`
```ts
type TxPayloadWithdrawParam = {
  sender: string;
  chain_id: number;
  token_address: string;
  amount: bigint;
}
```

### `GetMaxQuoteParam`
```ts
type GetMaxQuoteParam = {
  sender: string;
}
```

### `GetMaxQuotesResponse`
```ts
type GetMaxQuotesResponse = {
  list_max_quote: {
    token: string; 
    chain_id: number; 
    amount: number; 
  }[]
}
```

### `UserStaticsParam`
```ts
type UserStaticsParam = {
  address: string;
}
```

### `TxPayloadWithdrawResponse`
```ts
type TxPayloadWithdrawResponse = {
  tx: string;
}
```

### `TxPayloadDepositResponse`
```ts
type TxPayloadDepositResponse = {
  tx: string;
}
```

### `GetWalletAccountAssetsParam`
```ts
type GetWalletAccountAssetsParam = {
  sender: string;
}
```

### `GetWalletAccountAssetsResponse`
```ts
type GetMaxQuotesResponse = {
    chain_id: string; 
    usdt: number; 
    usdc: number; 
}[]
```

### `HeaderRequirements`
```ts
{
  headers: {
     "X-Client-Code": "integration code", 
  }
}
```