# MoneyFi SDK

A TypeScript SDK for interacting with **MoneyFi strategies across multiple blockchain networks**, providing seamless integration for DeFi operations including deposits, withdrawals, and account management.

This library provides **ready-to-use transaction payloads** and API methods so frontend dApps can integrate **deposit**, **withdraw**, **user management**, and **statistics** features with various blockchain wallets.

## 📦 Installation

```bash
npm install @moneyfi/ts-sdk
```

## 🚀 Quick Start

### 1. Import & Initialize

```typescript
import type { UserStatistic } from '@moneyfi/ts-sdk';
import { MoneyFi } from '@moneyfi/ts-sdk';

// Initialize SDK
const moneyFi = new MoneyFi("integration_code");
```

### 2. Basic Usage Example

```typescript
// Create or get user
const user = await moneyFi.createUser({
  user_address: 'your-wallet-address',
});

// Check if wallet account exists
const hasAccount = await moneyFi.hasWalletAccount({
  sender: 'your-wallet-address'
});

// Get deposit transaction payload
const depositPayload = await moneyFi.getDepositTxPayload({
  chain_id: CHAIN_ID.APTOS,
  sender: 'your-wallet-address',
  token_address: 'token-contract-address',
  amount: BigInt(1000)
});
```

## 📖 API Reference

### Core Methods

#### 🔹 Constructor

```typescript
new MoneyFi(config)
```

**Parameters**
- `config` → Array of chain configurations, each containing `chains`, `integration_code` and `api_key`

**Throws**
- Error when config array is empty

---

#### 🔹 createUser(payload)

Creates or registers a user in the MoneyFi backend.

**Parameters**
- `payload: CreateUserPayload` → User creation data including address and optional referral code

**Returns**
- `Promise<User>` → User object with registration details

---

#### 🔹 hasWalletAccount(params)

Checks if a given Aptos account already has a MoneyFi wallet account initialized on-chain.

Useful before calling getDepositTxPayload or getTxInitializationWalletAccount.

**Parameters**
- `params: HasWalletAccountParam` → Parameters including user address

**Returns**
- `Promise<boolean>` → True if wallet account exists, false otherwise

---

#### 🔹 getTxInitializationWalletAccount(params)

Requests initialization transaction for creating a wallet account (Aptos specific).
User must be create wallet account before depositing in Aptos. Each Aptos account corresponds to only one wallet account.

**Parameters**
- `params: TxInitializationWalletAccountParam` → Wallet initialization parameters

**Returns**
- `Promise<string>` → Signed transaction string prepared by backend

---

### Transaction Methods

#### 🔹 getDepositTxPayload(params)

Builds a raw transaction payload (BCS-encoded) for depositing supported tokens (USDC or USDT) into the MoneyFi protocol.
This transaction can then be signed and submitted by the user’s wallet.

**Parameters**
- `params: TxPayloadDepositParam` → Tx payload deposit parameters

**Returns**
- `Promise<TxPayloadDepositResponse>` → Raw transaction bytes (BCS-encoded) ready for signing & submitting.

---

#### 🔹 getWithdrawTxPayload(params)

Builds a raw transaction payload (BCS-encoded) for withdrawing supported tokens (USDC/USDT) from the MoneyFi protocol.
This transaction can then be signed and submitted by the user’s wallet.

**Parameters**
- `params: TxPayloadWithdrawParam` → Tx payload withdrawal parameters

**Returns**
- `Promise<TxPayloadWithdrawResponse>` →  Raw transaction bytes (BCS-encoded) ready for signing & submitting.

---

#### 🔹 reqWithdraw(address, payload)

Initiates an off-chain withdraw request.
The request is verified using a signature + public key and then processed by the MoneyFi backend.
You can later track its progress with getWithdrawStatus.

**Parameters**
- `address: string` → User wallet address
- `payload: ReqWithdrawPayload` → Withdrawal request details

**Returns**
- `Promise<void>`

---

#### 🔹 getWithdrawStatus(address)

Gets the processing status of a withdrawal request.

**Parameters**
- `address: string` → User wallet address

**Returns**
- `Promise<WithdrawStatusResponse>` → The status withdraw request from  reqWithdraw..

---

### Information Methods

#### 🔹 getUserStatistic(params)

Fetches user statistics for a specific chain.

**Parameters**
- `params: UserStaticsParam` → User statics param

**Returns**
- `Promise<UserStatistic>` → User statistics and performance data

---

#### 🔹 getSupportedChains()

Lists all supported blockchain networks.

**Returns**
- `Promise<SupportedChains>` → Available chains and their configurations

---

#### 🔹 getSupportedTokens()

Lists all supported tokens across networks.

**Returns**
- `Promise<SupportedTokens>` → Available tokens and their details

---

#### 🔹 getUserInformation(address)

Fetches detailed user information by wallet address.

**Parameters**
- `address: string` → User wallet address

**Returns**
- `Promise<User>` → Complete user profile and account details

---

#### 🔹 getMaxQuotesAmount(params)

Gets pricing and quote information for trading operations.

**Parameters**
- `params: GetQuoteParam` → Quote request parameters.

**Returns**
- `Promise<GetQuoteResponse>` → Quote information and pricing details

---

## Frontend Integration Flow
### User Management
1. Use `createUser(payload)` to register new users if not exist
2. Call `hasWalletAccount(params)` to check wallet account exist in Aptos
3. Use `getTxInitializationWalletAccount(params)` if wallet account setup is needed in Aptos and then submit the signed transaction to the blockchain

### Deposit Flow
1. Call `getDepositTxPayload(params)` with deposit details
2. Pass returned payload to the connected wallet for user signing
3. Submit the signed transaction to the blockchain
4. Monitor transaction status

### Withdrawal Flow
1. Call `reqWithdraw(address, payload)` for off-chain processing
2. Use `getWithdrawStatus(address)` to monitor withdrawal progress
3. Call `getWithdrawTxPayload(params)` for on-chain withdrawal
4. Pass returned payload to the connected wallet for user signing
5. Submit the signed transaction to the blockchain
6. Monitor transaction status

### Claim referral reward Flow
1. Call `getWithdrawTxPayload(params)` for on-chain withdrawal
2. Pass returned payload to the connected wallet for user signing
3. Submit the signed transaction to the blockchain
4. Monitor transaction status

### User Information
1. Call `getUserStatistic(params)` to retrieve a user’s investment analytics.
2. Use `getUserInformation(address)` to retrieve a user’s general information.

### Supported chains and tokens
1. Call `getSupportedChains()` to retrieve list of supported chain.
2. Use `getSupportedTokens()` to retrieve list of supported token.


### Example: https://github.com/MoneyFi-fund/moneyfi-SDK-example

## Documentation
- [API Reference](https://github.com/your-org/your-sdk/blob/main/docs/api.md)
- [Examples] (https://github.com/MoneyFi-fund/moneyfi-SDK-example)