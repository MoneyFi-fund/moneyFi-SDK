
// SPDX-License-Identifier: Apache-2.0
import { Aptos, AptosConfig, AccountAddressInput, Network, AccountAddress, MoveValue, AptosApiType } from "@aptos-labs/ts-sdk";
import { APTOS_ADDRESS } from "../../utils/const"
import { MONEY_FI_APTOS_FUNCTION_ID } from "../../utils/const";
import { MoneyFiErros } from "../../errors/index";
import { MoneyFiSetting, CreateUser, User } from "../../types/types";
import {apiPost, apiGet} from "../../utils/helpers"; 

export class MoneyFiAptos {
  readonly aptosClient: Aptos;
  readonly aptosConfig: AptosConfig;

  constructor(setting?: MoneyFiSetting) {

    // Init Aptos config 
    if (setting?.customRpcUrl) {
      this.aptosConfig = new AptosConfig({ network: Network.MAINNET, fullnode: setting.customRpcUrl });
      this.aptosClient = new Aptos(this.aptosConfig);
    } else {
      this.aptosConfig = new AptosConfig({ network: Network.MAINNET });
      this.aptosClient = new Aptos(this.aptosConfig);
    }
  }

  async getOrCreatePartnership(address: AccountAddressInput): Promise<User> {
    console.log({ user_address: {Aptos: address}, is_partnership: true});
  
    return await apiPost("sdk-create-user", { user_address: {Aptos: address}, is_partnership: true});
  }

  async getOrCreateUser(address: AccountAddressInput, refBy?: string): Promise<User> {
    let body: CreateUser = {user_address: {Aptos: address}, is_partnership: false}; 
    if(refBy) {
      body.ref_by = refBy; 
    }

    return await apiPost("sdk-create-user", body);
  }

  async getTxInitializationWalletAccount(address: AccountAddressInput): Promise<string> {
    console.log( { user_address: {Aptos: address},  client_url: this.aptosConfig.getRequestUrl(AptosApiType.FULLNODE)})
     let tt = await apiPost<string>("sdk-create-wallet-account", { user_address: {Aptos: address},  client_url: this.aptosConfig.getRequestUrl(AptosApiType.FULLNODE)});

     console.log({tt})
     return tt; 
  }

  async hasWalletAccount(address: AccountAddressInput): Promise<MoveValue> {
    const addressToVectorU8 = AccountAddress.from(address).toUint8Array();

    let isExist = await this.aptosClient.view({
      payload: {
        function: MONEY_FI_APTOS_FUNCTION_ID.HAS_WALLET_ACCOUNT,
        functionArguments: [addressToVectorU8]
      }
    })

    return isExist[0];
  }

  async getDepositTxPayload(tokenAddress: AccountAddressInput, sender: AccountAddressInput, amount: bigint): Promise<Uint8Array> {

    if (tokenAddress != APTOS_ADDRESS.USDC && tokenAddress != APTOS_ADDRESS.USDT) {
      throw new Error(
        MoneyFiErros.INVALID_SUPPORTED_TOKEN
      );
    }

    const isExist = await this.hasWalletAccount(sender);
    if (!isExist) {
      throw new Error(MoneyFiErros.UNKNOW_WALLET_ACCOUNT);
    }
    const transaction = await this.aptosClient.transaction.build.simple({
      sender: sender,
      data: {
        function: MONEY_FI_APTOS_FUNCTION_ID.DEPOSIT,
        functionArguments: [APTOS_ADDRESS.USDC, amount],
      },
    });
    return transaction.rawTransaction.bcsToBytes();
  }
}
