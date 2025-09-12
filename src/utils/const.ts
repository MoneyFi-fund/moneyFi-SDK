
// SPDX-License-Identifier: Apache-2.0

/**
 * Types of API endpoints used for routing requests in the Aptos network.
 * @group Implementation
 * @category Utils
 */
export enum AptosApiType {
  FULLNODE = "Fullnode",
  INDEXER = "Indexer",
  FAUCET = "Faucet",
  PEPPER = "Pepper",
  PROVER = "Prover",
}

/**
 * The default max gas amount when none is given.
 *
 * This is the maximum number of gas units that will be used by a transaction before being rejected.
 *
 * Note that max gas amount varies based on the transaction.  A larger transaction will go over this
 * default gas amount, and the value will need to be changed for the specific transaction.
 * @group Implementation
 * @category Utils
 */
export const DEFAULT_MAX_GAS_AMOUNT = 200000;

/**
 * The default transaction expiration seconds from now.
 *
 * This time is how long until the blockchain nodes will reject the transaction.
 *
 * Note that the transaction expiration time varies based on network connection and network load.  It may need to be
 * increased for the transaction to be processed.
 * @group Implementation
 * @category Utils
 */
export const DEFAULT_TXN_EXP_SEC_FROM_NOW = 20;

/**
 * The default number of seconds to wait for a transaction to be processed.
 *
 * This time is the amount of time that the SDK will wait for a transaction to be processed when waiting for
 * the results of the transaction.  It may take longer based on network connection and network load.
 * @group Implementation
 * @category Utils
 */
export const DEFAULT_TXN_TIMEOUT_SEC = 20;

/**
 * The default gas currency for the network.
 * @group Implementation
 * @category Utils
 */
export const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
/**
 * @group Implementation
 * @category Utils
 */
export const APTOS_FA = "0x000000000000000000000000000000000000000000000000000000000000000a";
/**
 * @group Implementation
 * @category Utils
 */
export const RAW_TRANSACTION_SALT = "APTOS::RawTransaction";
/**
 * @group Implementation
 * @category Utils
 */
export const RAW_TRANSACTION_WITH_DATA_SALT = "APTOS::RawTransactionWithData";

/**
 * Supported processor types for the indexer API, sourced from the processor_status table in the indexer database.
 * {@link https://cloud.hasura.io/public/graphiql?endpoint=https://api.mainnet.aptoslabs.com/v1/graphql}
 * @group Implementation
 * @category Utils
 */
export enum ProcessorType {
  ACCOUNT_RESTORATION_PROCESSOR = "account_restoration_processor",
  ACCOUNT_TRANSACTION_PROCESSOR = "account_transactions_processor",
  DEFAULT = "default_processor",
  EVENTS_PROCESSOR = "events_processor",
  // Fungible asset processor also handles coins
  FUNGIBLE_ASSET_PROCESSOR = "fungible_asset_processor",
  STAKE_PROCESSOR = "stake_processor",
  // Token V2 processor replaces Token processor (not only for digital assets)
  TOKEN_V2_PROCESSOR = "token_v2_processor",
  USER_TRANSACTION_PROCESSOR = "user_transaction_processor",
  OBJECT_PROCESSOR = "objects_processor",
}

/**
 * Regular expression pattern for Firebase Auth issuer URLs
 * Matches URLs in the format: https://securetoken.google.com/[project-id]
 * where project-id can contain letters, numbers, hyphens, and underscores
 */
export const FIREBASE_AUTH_ISS_PATTERN = /^https:\/\/securetoken\.google\.com\/[a-zA-Z0-9-_]+$/;



// Money Fi 
// Type 
type AptosFunctionId = `${string}::${string}::${string}`;


export const MONEY_FI_APTOS_FUNCTION_ID: Record<string, AptosFunctionId> = {
  HAS_WALLET_ACCOUNT:
    "0xfd69465f1a84bda78f8c6c0ff0123ebbfe0cd9d80fecc2350e8fbb71576aeab6::wallet_account::has_wallet_account",
  DEPOSIT:
    "0xfd69465f1a84bda78f8c6c0ff0123ebbfe0cd9d80fecc2350e8fbb71576aeab6::vault::deposit",
};

export const APTOS_ADDRESS = {
 VAULT_CONTACT_APTOS: "0xfd69465f1a84bda78f8c6c0ff0123ebbfe0cd9d80fecc2350e8fbb71576aeab6", 
 USDC: "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b", 
 USDT: "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
}