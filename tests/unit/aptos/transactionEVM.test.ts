// SPDX-License-Identifier: Apache-2.0

import { MoneyFi } from "../../../src";
import {
  CreateUserPayload,
  UserStatistic,
  UserStaticsParam,
  HasWalletAccountParam,
  TxPayloadDepositParam,
  TxPayloadWithdrawParam,
  ReqWithdrawPayload,
  WithdrawStatusResponse,
  SupportedChains,
  SupportedTokens,
  TxInitializationWalletAccountParam,
  PayloadType,
  WithdrawRequestEvmPayload,
  GetUserAssetBalanceParam,
} from "../../../src/types";
import { CHAIN_ID } from "../../../src";
describe("Transaction EVM", () => {
  let moneyFi: MoneyFi;
  let existWalletAccount: string;
  let usdcARB = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
  let partner_ship_code = "JYT55duCUlJj";
  let arbChainId = 42161;

  beforeEach(() => {
    moneyFi = new MoneyFi(partner_ship_code);
    existWalletAccount = "0x5cec46E37B1B15E9A7Cd67195Cd4E2081b85fcD6";
  });

  // test("it should return tx deposit payload", async () => {
  //   let depositAmount = "1000";
  //   let depositParam: TxPayloadDepositParam = {
  //     type: PayloadType.Evm,
  //     chain_id: arbChainId,
  //     token_address: usdcARB,
  //     amount: depositAmount,
  //     target_chain: -1,
  //   };
  //   const transaction = await moneyFi.getDepositTxPayload(depositParam);
  //   expect(transaction.tx.length).toBeGreaterThan(0);
  // });

  // Already created
  // test("it should return user account should right", async () => {
  //   let newEvmAddress = existWalletAccount

  //   let newUser: CreateUserPayload = {
  //     user_address: { Evm: newEvmAddress },
  //   }
  //   let res = await moneyFi.createUser(newUser);
  //   expect(res.is_partnership).toBe(false);
  // });

  // test("it should return user statistics", async () => {
  //   let userStaticsParam: UserStaticsParam = {
  //     address: existWalletAccount,
  //   }
  //   const exist = await moneyFi.getUserStatistic(userStaticsParam);

  //   console.log(exist);

  //   expect(exist).toBeDefined();
  //   expect(exist).toMatchObject<UserStatistic>({
  //     total_value: expect.any(Number),
  //     apr_avg: expect.any(Number),
  //     cumulative_yield_profits: expect.any(Number),
  //     idle_asset_value: expect.any(Number),
  //     pending_yield_earnings: expect.any(Number),
  //     total_deposited_liquidity: expect.any(Number),
  //     total_monetized_balance: expect.any(Number),
  //     total_withdrawn_liquidity: expect.any(Number),
  //     referral_balance: expect.any(Number),
  //   });
  // }, 100000);

  // wrong
  // test("it should return withdraw status", async () => {
  //   const exist = await moneyFi.getWithdrawStatus(existWalletAccount);

  //   console.log(exist);
  //   expect(exist.status).toBeTruthy();
  // });

  // test("it should return user information", async () => {
  //   const exist = await moneyFi.getUserInformation(existWalletAccount);

  //   expect(exist.address).toBe("0x90f5F330f1711eC55AC1658ad364996f16B4A9d0");
  // });

  // deploying
  // test("it should get list quote max success", async () => {
  //   const res = await moneyFi.getMaxQuotesAmount({ sender: existWalletAccount });
  //   console.log(res);
  // });

  test("it should get bridge status max success", async () => {
    const address = "0x23042F2D5B10cb21512c0a5a65a50cb8F5a24D67"; 
    const res = await moneyFi.getBridgeStatus(address );
    console.log(res);
  });


  // test("it should get user asset allocation", async () => {
  //   const address = "0xbC8c981c039A1262002ee43AadF8e9A61fe084d4";
  //   const res = await moneyFi.getUserAssetAllocationResponse(address);
  //   console.log(res);
  // });

  test("it should get user asset balance", async () => {
    const params: GetUserAssetBalanceParam = {
      sender: "0x8648511f4afa5d127c4381f992904bce332b5617",
      chain_id: 8453,
      token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    };
    const res = await moneyFi.getUserAssetBalance(params);
    console.log(res);
    expect(res).toBeDefined();
    expect(res.balance).toBeDefined();
  });
});
