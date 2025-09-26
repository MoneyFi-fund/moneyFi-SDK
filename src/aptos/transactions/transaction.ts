// SPDX-License-Identifier: Apache-2.0
import { ChainSetting, CreateUserPayload, User, UserStatistic, GetQuoteParam, UserStaticsParam, HasWalletAccountParam, TxPayloadDepositParam, TxPayloadWithdrawParam, ReqWithdrawPayload, WithdrawStatusResponse, SupportedChains, SupportedTokens, TxInitializationWalletAccountParam, TxPayloadWithdrawResponse, TxPayloadDepositResponse, TxPayloadReferralRewardWithdrawParam, MoneyFiConfig, GetQuoteResponse, TxPayloadReferralRewardWithdrawResponse } from "../../types/types";
import { MoneyFiErrors } from "../../errors/index";
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
 *    - getWithdrawReferralRewardTxPayload(params) -> obtain withdraw tx withdraw referral reward payload to sign and submit
 *    - getUserStatistic(params)            -> fetch user statistics
 *    - reqWithdraw(address, payload)       -> request off-chain withdraw processing
 *    - getWithdrawStatus(address)          -> check withdraw processing status
 *    - getSupportedChains()/getSupportedTokens() -> enumerate supported networks/tokens
 *    - getUserInformation(address)               -> fetch user information
 *    - getMaxQuotesAmount(params)                    -> get quote/pricing info (uses chain RPC)
 *
 * Notes:
 * - Methods call apiGet/apiPost and may throw on network/HTTP errors; wrap calls in try/catch.
 * - For tx payload methods the returned object typically contains a tx payload that must be
 *   passed to a wallet for signing/submission. The SDK attaches chain RPC via getUrlRpcByChainId.
 */
export class MoneyFi {
  readonly money_fi_setting: ChainSetting[];
  readonly integration_code: string; 
  readonly api_key: string; 
  /**
   * Create MoneyFi SDK instance.
   * @param config - array of ChainSetting; must contain at least one entry.
   *                 Each entry should include chain_id and custom_rpc_url.
   * @throws Error when config is empty.
   */
  constructor(config: MoneyFiConfig) {
    if (!config.chains.length || !config.integration_code.length || !config.api_key.length) {
      throw new Error(MoneyFiErrors.INVALID_CHAIN_SETTING);
    }

    this.money_fi_setting = config.chains.map(item => ({
      client_url: item.client_url,
      chain_id: item.chain_id,
    }));

    this.integration_code = config.integration_code; 
    this.api_key = config.api_key;
  }

  /**
   * Create or register a user in MoneyFi backend.
   * @param payload CreateUserPayload object (see types).
   * @returns Promise<User>
   */
  async createUser(payload: CreateUserPayload): Promise<User> {
    return await apiPost("v1/sdk/create-user", {...payload, ref_by: this.integration_code}, this.integration_code);
  }

  /**
 * Request initialization transaction for creating a wallet account (Aptos).
 * The SDK adds the Aptos RPC URL from the configured chain settings.
 * @param params TxInitializationWalletAccountParam
 * @returns signed tx (string) prepared by backend
 */
  async getTxInitializationWalletAccount(params: TxInitializationWalletAccountParam): Promise<string> {
    let rpc = this.getUrlsRpcByChainIds([CHAIN_ID.APTOS]);
    return await apiPost<string>("v1/sdk/create-wallet-account", { ...params, client_url: rpc }, this.integration_code);
  }

  /**
   * Check whether a wallet account exists for provided parameters.
   * @param params HasWalletAccountParam
   * @returns boolean
   */
  async hasWalletAccount(params: HasWalletAccountParam): Promise<boolean> {
    let rpc = this.getUrlsRpcByChainIds([CHAIN_ID.APTOS]);
    return await apiGet<boolean>("v1/sdk/has-wallet-account", { ...params, client_url: rpc }, this.integration_code);
  }

  /**
   * Request deposit transaction payload from backend.
   * The returned TxPayloadDepositResponse typically includes a payload to sign.
   * @param params TxPayloadDepositParam
   * @returns TxPayloadDepositResponse
   */
  async getDepositTxPayload(params: TxPayloadDepositParam): Promise<TxPayloadDepositResponse> {
    let client_url = this.getUrlsRpcByChainIds([params.chain_id])[0].client_url;
    return await apiGet<TxPayloadDepositResponse>("v1/sdk/tx-payload-deposit", { ...params, client_url }, this.integration_code);
  }

  /**
   * Request withdraw transaction payload from backend.
   * @param params TxPayloadWithdrawParam
   * @returns TxPayloadWithdrawResponse
   */
  async getWithdrawTxPayload(params: TxPayloadWithdrawParam): Promise<TxPayloadWithdrawResponse> {
    let client_url = this.getUrlsRpcByChainIds([params.chain_id])[0].client_url;
    return await apiGet<TxPayloadWithdrawResponse>("v1/sdk/tx-payload-withdraw", { ...params, client_url }, this.integration_code);
  }

  /**
   * Request withdraw referral reward transaction payload from backend.
   * @param params TxPayloadReferralRewardWithdrawParam
   * @returns TxPayloadReferralRewardWithdrawParam
   */
  async getWithdrawReferralRewardTxPayload(params: TxPayloadReferralRewardWithdrawParam): Promise<TxPayloadReferralRewardWithdrawResponse> {
    let client_url = this.getUrlsRpcByChainIds([params.chain_id])[0].client_url;
    return await apiGet<TxPayloadWithdrawResponse>("v1/sdk/tx-payload-referral-reward-withdraw-", { ...params, client_url}, this.integration_code);
  }

  /**
   * Fetch user statistics for a given chain.
   * @param params UserStaticsParam
   * @returns UserStatistic
   */
  async getUserStatistic(params: UserStaticsParam): Promise<UserStatistic> {
    let networks = this.getUrlsRpcByChainIds(params.chain_ids);
    return await apiGet<UserStatistic>("v1/sdk/user-statistic", { ...params, networks }, this.integration_code);
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
    return await apiPost(`v1/sdk/req-withdraw?address=${address}`, payload, this.integration_code);
  }

  /**
    * Get withdraw processing status for an address.
    * @param address string
    * @returns WithdrawStatusResponse
    */
  async getWithdrawStatus(address: string): Promise<WithdrawStatusResponse> {
    return await apiGet<WithdrawStatusResponse>(`v1/sdk/req-withdraw-status?address=${address}`, {},  this.integration_code);
  }

  /**
   * List supported chains from backend.
   * @returns SupportedChains
   */
  async getSupportedChains(): Promise<SupportedChains> {
    return await apiGet<SupportedChains>(`v1/sdk/get-supported-chains`, {},  this.integration_code);
  }

  /**
 * List supported tokens from backend.
 * @returns SupportedTokens
 */
  async getSupportedTokens(): Promise<SupportedTokens> {
    return await apiGet<SupportedTokens>(`v1/sdk/get-supported-tokens`, {},  this.integration_code);
  }

  /**
 * Fetch user information by address.
 * @param address string
 * @returns User
 */
  async getUserInformation(address: string): Promise<User> {
    return await apiGet<User>(`v1/sdk/get-user-information?sender=${address}`, {},  this.integration_code);
  }

  /**
 * Get quote/pricing info for a given request.
 * Adds the configured RPC URL for the provided chain_id.
 * @param params GetQuoteParam
 * @returns User (quote info)
 */
  async getMaxQuotesAmount(params: GetQuoteParam): Promise<GetQuoteResponse> {
    let networks = this.getUrlsRpcByChainIds(params.to_chain_ids);
    return await apiGet<GetQuoteResponse>(`v1/sdk/get-max-quotes`, { ...params, networks },  this.integration_code);
  }

  /**
 * Resolve RPC URLs for a list of chain_ids.
 * @param chainIds number[]
 * @throws Error when any chain_id is not found.
 * @returns Array<{ chain_id: number; rpc: string }>
 */
getUrlsRpcByChainIds(
  chainIds: number[]
): ChainSetting[] {
  const results: ChainSetting[] = [];

  for (const chainId of chainIds) {
    const setting = this.money_fi_setting.find((s) => s.chain_id === chainId);

    if (!setting) {
      throw new Error(`${MoneyFiErrors.NOT_FOUND_RPC} - chainId ${chainId}`);
    }

    results.push({
      chain_id: chainId,
      client_url: setting.client_url,
    });
  }

  return results;
}

}
