// SPDX-License-Identifier: Apache-2.0
import { CreateUserPayload, User, UserStatistic, UserStaticsParam, HasWalletAccountParam, TxPayloadDepositParam, TxPayloadWithdrawParam, ReqWithdrawPayload, WithdrawStatusResponse, SupportedChains, SupportedTokens, TxInitializationWalletAccountParam, TxPayloadWithdrawResponse, TxPayloadDepositResponse, GetMaxQuoteParam, GetMaxQuotesResponse } from "../../types/types";
import { MoneyFiErrors } from "../../errors/index";
import { apiPost, apiGet } from "../../utils/helpers";

/**
 * MoneyFi SDK entry for transaction-related operations.
 *
 * Responsibilities:
 * - Handle integration with MoneyFi backend endpoints.
 * - Provide typed, developer-friendly methods for transaction lifecycle management.
 *
 * Usage:
 * ```ts
 * const sdk = new MoneyFi("<integration_code>");
 * const user = await sdk.createUser({ ...payload });
 * const depositPayload = await sdk.getDepositTxPayload({ ...params });
 * ```
 *
 * Notes:
 * - All methods return Promises and should be awaited.
 * - Errors are thrown on invalid input or failed API calls.
 */
export class MoneyFi {
  readonly integration_code: string;

  /**
   * Create MoneyFi SDK instance.
   * @param integration_code - Unique integration code assigned to client application.
   * @throws {Error} If the integration code is empty.
   */
  constructor(integration_code: string) {
    if (!integration_code.length) {
      throw new Error(MoneyFiErrors.INVALID_CHAIN_SETTING);
    }

    this.integration_code = integration_code;
  }

  /**
    * Create a user in MoneyFi backend.
    * @param payload - User creation payload.
    * @returns Promise resolving to a {@link User}.
    */
  async createUser(payload: CreateUserPayload): Promise<User> {
    return await apiPost("v1/sdk/create-user", payload, this.integration_code);
  }

  /**
   * Initialize a wallet account (Aptos-specific).
   * @param params - Wallet account initialization parameters.
   * @returns Promise resolving to a signed transaction string.
   */
  async getTxInitializationWalletAccount(params: TxInitializationWalletAccountParam): Promise<string> {
    return await apiPost<string>("v1/sdk/create-wallet-account", params, this.integration_code);
  }

  /**
    * Check if a wallet account exists.
    * @param params - Wallet account check parameters.
    * @returns Promise resolving to `true` if wallet exists, otherwise `false`.
    */
  async hasWalletAccount(params: HasWalletAccountParam): Promise<boolean> {
    return await apiGet<boolean>("v1/sdk/has-wallet-account", params, this.integration_code);
  }

  /**
    * Generate deposit transaction payload.
    * @param params - Deposit transaction parameters.
    * @returns Promise resolving to a {@link TxPayloadDepositResponse}.
    */
  async getDepositTxPayload(params: TxPayloadDepositParam): Promise<TxPayloadDepositResponse> {
    return await apiGet<TxPayloadDepositResponse>("v1/sdk/tx-payload-deposit", params, this.integration_code);
  }

  /**
   * Generate withdraw transaction payload.
   * @param params - Withdraw transaction parameters.
   * @returns Promise resolving to a {@link TxPayloadWithdrawResponse}.
   */
  async getWithdrawTxPayload(params: TxPayloadWithdrawParam): Promise<TxPayloadWithdrawResponse> {
    return await apiGet<TxPayloadWithdrawResponse>("v1/sdk/tx-payload-withdraw", params, this.integration_code);
  }

  /**
    * Retrieve user statistics on-chain and off-chain.
    * @param params - Statistics request parameters.
    * @returns Promise resolving to a {@link UserStatistic}.
    */
  async getUserStatistic(params: UserStaticsParam): Promise<UserStatistic> {
    return await apiGet<UserStatistic>("v1/sdk/user-statistic", params, this.integration_code);
  }

  /**
    * Submit an off-chain withdraw request.
    * @param address - User wallet address.
    * @param payload - Withdraw request payload.
    * @returns Promise resolving when request is successfully submitted.
    */
  async reqWithdraw(
    address: string,
    payload: ReqWithdrawPayload
  ): Promise<void> {
    return await apiPost(`v1/sdk/req-withdraw?address=${address}`, payload, this.integration_code);
  }

  /**
     * Get withdraw request status.
     * @param address - User wallet address.
     * @returns Promise resolving to a {@link WithdrawStatusResponse}.
     */
  async getWithdrawStatus(address: string): Promise<WithdrawStatusResponse> {
    return await apiGet<WithdrawStatusResponse>(`v1/sdk/req-withdraw-status?address=${address}`, {}, this.integration_code);
  }

  /**
   * List supported chains from backend.
   * @returns SupportedChains
   */
  async getSupportedChains(): Promise<SupportedChains> {
    return await apiGet<SupportedChains>(`v1/sdk/get-supported-chains`, {}, this.integration_code);
  }

  /**
   * Fetch supported chains available in MoneyFi.
   * @returns Promise resolving to {@link SupportedChains}.
   */
  async getSupportedTokens(): Promise<SupportedTokens> {
    return await apiGet<SupportedTokens>(`v1/sdk/get-supported-tokens`, {}, this.integration_code);
  }


  /**
    * Retrieve user information by address.
    * @param address - User wallet address.
    * @returns Promise resolving to a {@link User}.
    */
  async getUserInformation(address: string): Promise<User> {
    return await apiGet<User>(`v1/sdk/get-user-information?sender=${address}`, {}, this.integration_code);
  }

  /**
    * Retrieve maximum quote amount for a given request.
    * @param params - Quote request parameters.
    * @returns Promise resolving to a {@link GetMaxQuoteResponse}.
    */
  async getMaxQuotesAmount(params: GetMaxQuoteParam): Promise<GetMaxQuotesResponse> {
    return await apiGet<GetMaxQuotesResponse>(`v1/sdk/get-max-quotes-amount`, params, this.integration_code);
  }
}
