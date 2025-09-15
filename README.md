MoneyFi Aptos SDK
=================

A TypeScript SDK for interacting with **MoneyFi strategies on Aptos**, built on top of [@aptos-labs/ts-sdk](https://www.npmjs.com/package/@aptos-labs/ts-sdk).

This library provides **ready-to-use transaction payloads** so frontend dApps can integrate **deposit**, **withdraw**, and **preview withdraw** features with Aptos wallets (e.g., Petra, Martian, Pontem).

📦 Installation
---------------

🚀 Quick Start
--------------

### 1\. Import & Initialize

📖 Function Reference
---------------------


### 🔹 hasWalletAccount(address)

Builds a **raw deposit transaction payload** for depositing USDC.

*   **Parameters**
    
    *   address → Aptos account address (user’s wallet)
        
*   **Returns**
    
    *  Boolean value
        
*   **Frontend Flow**
    
    1.  Call getDepositTxPayloadRaw(sender, amount)
        
    2.  Pass returned payload to the connected wallet for signing
        
    3.  Submit the transaction
        

### 🔹 getDepositTxPayload(tokenAddress, sender, amount)

Builds a **raw deposit transaction payload** for depositing USDC.

*   **Parameters**
    
    *   tokenAddress → Aptos account address (user’s wallet)

    *   sender → Aptos account address (user’s wallet)
        
    *   amount → Deposit amount in smallest unit (e.g., 1 USDC = 1,000,000 if decimals = 6)
        
*   **Returns**
    
    *   Uint8Array value

🔹 getOrCreatePartnership(address)
----------------------------------

Creates a **new user** (non-partnership) or retrieves an existing one.Can optionally include a referral code.

**Parameters**

*   address → Aptos wallet address (AccountAddressInput)
    

**Returns**

*   Partnership object
    

🔹 getOrCreateUser(address, refBy)
----------------------------------

Creates a **new user** (non-partnership) or retrieves an existing one.Can optionally include a referral code.

**Parameters**

*   address → Aptos wallet address (AccountAddressInput)
    
*   refBy → Referral identifier (string)
    

**Returns**

*   User object
    

🔹 getTxInitializationAccount(address)
--------------------------------------

Initializes a user account on the MoneyFi backend.This links the Aptos wallet address with the Aptos fullnode URL.

**Parameters**

*   address → Aptos wallet address (AccountAddressInput)
    

**Returns**

*   Initialization transaction object
    