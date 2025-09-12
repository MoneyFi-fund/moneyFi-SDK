
// SPDX-License-Identifier: Apache-2.0
import { Aptos, AptosConfig, AccountAddressInput, Network, Hex, AccountAddress, MoveValue } from "@aptos-labs/ts-sdk";
import { APTOS_ADDRESS } from "../../utils/const"
import { MONEY_FI_APTOS_FUNCTION_ID } from "../../utils/const";
import { AptosErrors } from "../../errors/index";

export class MoneyFiAptos {
  readonly aptosClient: Aptos;
  readonly aptosConfig: AptosConfig;

  constructor(customRpcUrl?: string) {
    if (customRpcUrl) {
      this.aptosConfig = new AptosConfig({ network: Network.MAINNET, fullnode: customRpcUrl });
      this.aptosClient = new Aptos(this.aptosConfig);
    } else {
      this.aptosConfig = new AptosConfig({ network: Network.MAINNET });
      this.aptosClient = new Aptos(this.aptosConfig);
    }

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
        AptosErrors.INVALID_SUPPORTED_TOKEN
      );
    }

    const isExist = await this.hasWalletAccount(sender); 
    if(!isExist) {
      throw new Error(AptosErrors.UNKNOW_WALLET_ACCOUNT);
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


// readonly aptosClient: Aptos;
// readonly usdcAddress: string = "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b";

// constructor() {
//   const configAptos = new AptosConfig({ network: Network.MAINNET });
//   this.aptosClient = new Aptos(configAptos);
// }

// // async getDepositTxPayload(sender: AccountAddressInput, amount: bigint): Promise<RawTransactionPayload> {
// async getDepositTxPayload(amount: bigint): Promise<RawTransactionPayload> {

//   return {
//     function: "0x6be60fbf2136b9e8945bde4467cfaa3f83ff173fdb1333001233f89accc2893b::strategy_test::deposit_thala",
//     functionArguments: [`${this.usdcAddress}`, `${amount}`],
//   }
//   // const transaction = await this.aptosClient.transaction.build.simple({
//   //   sender: sender,
//   //   data: {
//   //     function: "0x6be60fbf2136b9e8945bde4467cfaa3f83ff173fdb1333001233f89accc2893b::strategy_test::deposit_thala",
//   //     functionArguments: [this.usdcAddress, amount],
//   //   },
//   // });
//   // return transaction;
// }

// //  async getWithdrawTxPayload(sender: AccountAddressInput): Promise<RawTransactionPayload> {
//  async getWithdrawTxPayload(): Promise<RawTransactionPayload> {
//    return {
//     function: "0x6be60fbf2136b9e8945bde4467cfaa3f83ff173fdb1333001233f89accc2893b::strategy_test::withdraw_thala",
//     functionArguments: [],
//   }

//   // const transaction = await this.aptosClient.transaction.build.simple({
//   //   sender: sender,
//   //   data: {
//   //     function: "0x6be60fbf2136b9e8945bde4467cfaa3f83ff173fdb1333001233f89accc2893b::strategy_test::withdraw_thala",
//   //     functionArguments: [],
//   //   },
//   // });
//   // return transaction;
// }

// async previewWithdraw(sender: AccountAddressInput): Promise<any> {
//    let previewAmount = await this.aptosClient.view({
//     payload: {
//       function: "0x6be60fbf2136b9e8945bde4467cfaa3f83ff173fdb1333001233f89accc2893b::strategy_test::preview_with_draw",
//       functionArguments: [sender]
//     }
//   })

//   return previewAmount;
// }