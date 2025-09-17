# 📖 MoneyFi SDK Document

# 1. Overview

The **MoneyFi SDK** provides a simple interface to interact with the MoneyFi Protocol on the blockchain.

### Core features:

- Create **User** and **Partnership** accounts
- Initialize wallet accounts
- Deposit and Withdraw assets
- Fetch user statistics and transaction statuses

# 2. Installation

```jsx
npm install @moneyfi/ts-sdk
# or
yarn add @moneyfi/ts-sdk

```

**Requirements:**

- Node.js >= 20

**Example:**

- https://github.com/phongtn28dev/moneyfi-sdk

# 3. Initialization

## 3.1 Aptos

### **Example 1: Default initialization (uses Aptos MAINNET default RPC)**

```tsx
import { MoneyFiAptos } from "@moneyfi/ts-sdk";

const sdk = new MoneyFiAptos();
// This will connect to the default Aptos MAINNET fullnode
```

### **Example 2: Custom fullnode RPC**

```tsx
import { MoneyFiAptos } from "@moneyfi/ts-sdk";

const sdk = new MoneyFiAptos({
  customRpcUrl: "https://fullnode.mainnet.aptoslabs.com/v1"
});

// Useful when you want to use your own RPC provider or a private node

```

## 3.2 EVM

- Upcoming

# 4. API Reference

## 4.1 Aptos

### **`getOrCreatePartnership`**

**Signature:**

```tsx
async getOrCreatePartnership(address: AccountAddressInput): Promise<User>

```

- https://github.com/phongtn28dev/moneyfi-sdk/blob/651516d198e6db6077c5b53da60b155e9a50d925/src/hooks/use-create.tsx#L60

**Description:** 

- Creates a new user marked as a **partnership account**, or fetches the existing one if it already exists.

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the partner.

**Returns:**

- `User` object with details:

```tsx
export type User = {
  id: number;              // unique user ID in the MoneyFi system
  created_at: Date;        // creation timestamp
  address: string;         // blockchain address (Aptos/EVM)
  ref_code: string;        // referral code assigned
  network: string;         // network name, e.g. "Aptos"
  is_partnership: boolean; // true if this user is a partner
}
```

### `getOrCreateUser`

**Signature:**

```tsx
async getOrCreateUser(
  address: AccountAddressInput, 
  refBy?: string
): Promise<User>
```

**Description:**

- Creates a new **regular user account** or fetches it if already exists.
- If a `refBy` referral code is provided, the new user will be linked to the referrer.

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the user.
- `refBy?` *(string, optional)*: Referral code of the inviter (if any).

**Returns:**

- `User` object with details:

```tsx
export type User = {
  id: number;              // Unique user ID in the MoneyFi system
  created_at: Date;        // Creation timestamp
  address: string;         // Blockchain address
  ref_code: string;        // Assigned referral code
  network: string;         // Network name, e.g. "Aptos"
  is_partnership: boolean; // false for regular users
}

```

### **`getTxInitializationWalletAccount`**

**Signature:**

```tsx
async getTxInitializationWalletAccount(
  address: AccountAddressInput
): Promise<string>
```

**Description:**

- Creates (or fetches) a **MoneyFi wallet account** for the given Aptos user address and returns the initialization transaction.
- This must be called before the user can deposit assets.

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the user.

**Returns:**

- `string`: The initialization transaction payload (BCS-encoded, hex string).

### `hasWalletAccount`

**Signature:**

```tsx
async hasWalletAccount(
  address: AccountAddressInput
): Promise<MoveValue>
```

**Description:**

- Checks if a given Aptos account already has a **MoneyFi wallet account** initialized on-chain.
- Useful before calling `getDepositTxPayload` or `getTxInitializationWalletAccount`.

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the user.

**Returns:**

- `MoveValue`: The on-chain boolean result (`true` if wallet exists, `false` otherwise).

### `getDepositTxPayload`

**Signature:**

```tsx
async getDepositTxPayload(
  tokenAddress: AccountAddressInput, 
  sender: AccountAddressInput, 
  amount: bigint
): Promise<Uint8Array>
```

**Description:**

- Builds a raw transaction payload (BCS-encoded) for depositing supported tokens (**USDC or USDT**) into the MoneyFi protocol.
- This transaction can then be signed and submitted by the user’s Aptos wallet.

**Parameters:**

- `tokenAddress` *(AccountAddressInput)*: Must be either `APTOS_ADDRESS.USDC` or `APTOS_ADDRESS.USDT`.
- `sender` *(AccountAddressInput)*: The Aptos account initiating the deposit.
- `amount` *(bigint)*: Amount of tokens to deposit (in smallest unit, e.g. `1000000n` = 1 USDC if decimals=6).

**Throws:**

- `MoneyFiErros.INVALID_SUPPORTED_TOKEN` → if token is not USDC/USDT.
- `MoneyFiErros.UNKNOW_WALLET_ACCOUNT` → if the sender has no initialized MoneyFi wallet account.

**Returns:**

- `Uint8Array`: Raw transaction bytes (BCS-encoded) ready for signing & submitting.

### `getWithdrawTxPayload`

**Signature:**

```tsx
async getWithdrawTxPayload(
  tokenAddress: AccountAddressInput, 
  sender: AccountAddressInput, 
  amount: bigint
): Promise<Uint8Array>

```

**Description:**

- Builds a raw transaction payload (BCS-encoded) for **withdrawing supported tokens (USDC/USDT)** from the MoneyFi protocol.
- This transaction can then be signed and submitted by the user’s Aptos wallet.

**Parameters:**

- `tokenAddress` *(AccountAddressInput)*: Must be either `APTOS_ADDRESS.USDC` or `APTOS_ADDRESS.USDT`.
- `sender` *(AccountAddressInput)*: The Aptos account that owns the MoneyFi wallet.
- `amount` *(bigint)*: Amount of tokens to withdraw (in smallest unit, e.g. `1000000n` = 1 USDC if decimals=6).

**Throws:**

- `MoneyFiErros.INVALID_SUPPORTED_TOKEN` → if token is not USDC/USDT.
- `MoneyFiErros.UNKNOW_WALLET_ACCOUNT` → if the sender has no initialized MoneyFi wallet account.

**Returns:**

- `Uint8Array`: Raw transaction bytes (BCS-encoded) ready for signing & submitting.

### `getUserStatistic`

**Signature:**

```tsx
async getUserStatistic(
  address: AccountAddressInput
): Promise<UserStatistic>
```

**Description:**

- Fetches the latest **user statistics** from the MoneyFi protocol.
- These metrics reflect the user’s on-chain activity such as deposits, withdrawals, APR, and profits.

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the user.

**Returns:**

- `UserStatistic` object with aggregated values.
    
    ```tsx
    export type UserStatistic = {
      total_value: Number;               // Total value of assets managed by the user
      idle_asset_value: Number;          // Idle (unused) assets value
      total_deposited_liquidity: Number; // Cumulative deposits
      cumulative_yield_profits: Number;  // Total earned yield
      total_monetized_balance: Number;   // Assets currently monetized
      pending_yield_earnings: Number;    // Yield not yet claimed
      total_withdrawn_liquidity: Number; // Cumulative withdrawals
      apr_avg: Number;                   // Average APR across positions
    }
    
    ```
    

`reqWithdraw`

**Signature:**

```tsx
async reqWithdraw(
  address: AccountAddressInput,
  payload: ReqWithdrawPayload
): Promise<void>
```

**Description:**

- Creates an **off-chain withdrawal request**.
- The request is verified using a signature + public key and then processed by the MoneyFi backend.
- You can later track its progress with `getWithdrawStatus`.

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the user requesting the withdrawal.
- `payload` *(ReqWithdrawPayload)*: Contains cryptographic proof of the withdrawal request.

```tsx
export type ReqWithdrawPayload = {
  signature: string; // Signed message in hex
  pubkey: string;    // Public key used for verification
  message: string;   // Original JSON string payload: { amount, target_chain_id, token_address }
}

```

**Returns:**

- `void` – confirmation that the request has been submitted.

## `getWithdrawStatus`

**Signature:**

```tsx
 async getWithdrawStatus(address: AccountAddressInput) : Promise<WithdrawStatusResponse>
```

**Description:**

- Get withdraw status from `reqWithdraw.`

**Parameters:**

- `address` *(AccountAddressInput)*: Aptos account address of the user requesting the withdrawal.

**Returns:**

- `WithdrawStatusResponse` – the status withdraw request from  `reqWithdraw.`.

```
export type TxnStatus = "done" | "failed" | "pending";

export type WithdrawStatusResponse = {
  status: TxnStatus | null;
}

```

