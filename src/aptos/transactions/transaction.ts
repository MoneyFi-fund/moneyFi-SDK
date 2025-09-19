// SPDX-License-Identifier: Apache-2.0
import { ChainSetting, CreateUserPayload, User, UserStatistic, GetQouteParam, UserStaticsParam, HasWalletAccountParam, TxPayloadDepositParam, TxPayloadWithdrawParam, ReqWithdrawPayload, WithdrawStatusResponse, SupportedChains, SupportedTokens, TxInitializationWalletAccountParam, TxPayloadWithdrawResponse, TxPayloadDepositResponse } from "../../types/types";
import { MoneyFiErros } from "../../errors/index";
import { apiPost, apiGet } from "../../utils/helpers";
import { CHAIN_ID } from "../../utils/const";

/**
 * MoneyFi SDK entry for transaction-related operations.
 *
 * Responsibilities:
 * - Hold chain RPC settings provided at construction time.
 * - Provide convenient methods that call backend SDK endpoints via apiGet/apiPost.
 *
 * Usage (frontend):
 * 1. Instantiate with an array of ChainSetting objects:
 *      const sdk = new MoneyFi([{ chain_id: <chain_id>, custom_rpc_url: "https://..." }]);
 *
 * 2. Use provided methods to request transaction payloads from backend:
 *    - createUser(payload)                 -> create user record
 *    - getTxInitializationWalletAccount()  -> initialize wallet account tx (Aptos-specific RPC added)
 *    - hasWalletAccount(params)            -> check if wallet account exists
 *    - getDepositTxPayload(params)         -> obtain deposit tx payload to sign and submit
 *    - getWithdrawTxPayload(params)        -> obtain withdraw tx payload to sign and submit
 *    - getUserStatistic(params)            -> fetch user statistics
 *    - reqWithdraw(address, payload)       -> request off-chain withdraw processing
 *    - getWithdrawStatus(address)          -> check withdraw processing status
 *    - getSupportedChains()/getSupportedTokens() -> enumerate supported networks/tokens
 *    - getUserInfor(address)               -> fetch user information
 *    - getQoute(params)                    -> get quote/pricing info (uses chain RPC)
 *
 * Notes:
 * - Methods call apiGet/apiPost and may throw on network/HTTP errors; wrap calls in try/catch.
 * - For tx payload methods the returned object typically contains a tx payload that must be
 *   passed to a wallet for signing/submission. The SDK attaches chain RPC via getUrlRpcByChainId.
 */
export class MoneyFi {
  readonly money_fi_setting: ChainSetting[];

  /**
   * Create MoneyFi SDK instance.
   * @param config - array of ChainSetting; must contain at least one entry.
   *                 Each entry should include chain_id and custom_rpc_url.
   * @throws Error when config is empty.
   */
  constructor(config: ChainSetting[]) {
    if (!config.length) {
      throw new Error(MoneyFiErros.INVALID_CHAIN_SETTING);
    }

    this.money_fi_setting = config.map(item => ({
      custom_rpc_url: item.custom_rpc_url,
      chain_id: item.chain_id,
    }));
  }

  /**
   * Create or register a user in MoneyFi backend.
   * @param payload CreateUserPayload object (see types).
   * @returns Promise<User>
   */
  async createUser(payload: CreateUserPayload): Promise<User> {
    return await apiPost("v1/sdk/create-user", payload);
  }

  /**
 * Request initialization transaction for creating a wallet account (Aptos).
 * The SDK adds the Aptos RPC URL from the configured chain settings.
 * @param params TxInitializationWalletAccountParam
 * @returns signed tx (string) prepared by backend
 */
  async getTxInitializationWalletAccount(params: TxInitializationWalletAccountParam): Promise<string> {
    let rpc = this.getUrlRpcByChainId(CHAIN_ID.APTOS);
    return await apiPost<string>("v1/sdk/create-wallet-account", { ...params, client_url: rpc });
  }

  /**
   * Check whether a wallet account exists for provided parameters.
   * @param params HasWalletAccountParam
   * @returns boolean
   */
  async hasWalletAccount(params: HasWalletAccountParam): Promise<boolean> {
    let rpc = this.getUrlRpcByChainId(CHAIN_ID.APTOS);
    return await apiGet<boolean>("v1/sdk/has-wallet-account", { ...params, client_url: rpc });
  }

  /**
   * Request deposit transaction payload from backend.
   * The returned TxPayloadDepositResponse typically includes a payload to sign.
   * @param params TxPayloadDepositParam
   * @returns TxPayloadDepositResponse
   */
  async getDepositTxPayload(params: TxPayloadDepositParam): Promise<TxPayloadDepositResponse> {
    let rpc = this.getUrlRpcByChainId(params.chain_id);
    return await apiGet<TxPayloadDepositResponse>("v1/sdk/tx-payload-deposit", { ...params, client_url: rpc });
  }

  /**
   * Request withdraw transaction payload from backend.
   * @param params TxPayloadWithdrawParam
   * @returns TxPayloadWithdrawResponse
   */
  async getWithdrawTxPayload(params: TxPayloadWithdrawParam): Promise<TxPayloadWithdrawResponse> {
    let rpc = this.getUrlRpcByChainId(params.chain_id);
    return await apiGet<TxPayloadWithdrawResponse>("v1/sdk/tx-payload-withdraw", { ...params, client_url: rpc });
  }

  /**
   * Fetch user statistics for a given chain.
   * @param params UserStaticsParam
   * @returns UserStatistic
   */
  async getUserStatistic(params: UserStaticsParam): Promise<UserStatistic> {
    let rpc = this.getUrlRpcByChainId(params.chain_id);
    return await apiGet<UserStatistic>("v1/sdk/user-statistic", { ...params, client_url: rpc });
  }

  /**
   * Request an off-chain withdraw action.
   * @param address string - user address used as query param
   * @param payload ReqWithdrawPayload - withdrawal details
   */
  async reqWithdraw(
    address: string,
    payload: ReqWithdrawPayload
  ): Promise<void> {
    return await apiPost(`v1/sdk/req-withdraw?address=${address}`, payload);
  }

  /**
    * Get withdraw processing status for an address.
    * @param address string
    * @returns WithdrawStatusResponse
    */
  async getWithdrawStatus(address: string): Promise<WithdrawStatusResponse> {
    return await apiGet<WithdrawStatusResponse>(`v1/sdk/req-withdraw-status?address=${address}`);
  }

  /**
   * List supported chains from backend.
   * @returns SupportedChains
   */
  async getSupportedChains(): Promise<SupportedChains> {
    return await apiGet<SupportedChains>(`v1/sdk/get-suported-chains`);
  }

  /**
 * List supported tokens from backend.
 * @returns SupportedTokens
 */
  async getSupportedTokens(): Promise<SupportedTokens> {
    return await apiGet<SupportedTokens>(`v1/sdk/get-suported-tokens`);
  }

  /**
 * Fetch user information by address.
 * @param address string
 * @returns User
 */
  async getUserInfor(address: string): Promise<User> {
    return await apiGet<User>(`v1/sdk/get-user-infomation?sender=${address}`);
  }

  /**
 * Get quote/pricing info for a given request.
 * Adds the configured RPC URL for the provided chain_id.
 * @param params GetQouteParam
 * @returns User (quote info)
 */
  async getQoute(params: GetQouteParam): Promise<User> {
    let rpc = this.getUrlRpcByChainId(params.chain_id);
    return await apiGet<User>(`v1/sdk/get-qoute`, { ...params, client_url: rpc });
  }

  /**
 * Resolve RPC URL configured for a chain_id.
 * @param chainId number
 * @throws Error when no matching chain settings are found.
 * @returns custom RPC URL string
 */
  getUrlRpcByChainId(
    chainId: number
  ): string {
    const setting = this.money_fi_setting.find((s) => s.chain_id === chainId);

    if (!setting) {
      throw new Error(`RPC URL not found for chainId ${chainId}`);
    }

    return setting.custom_rpc_url;
  }
}
