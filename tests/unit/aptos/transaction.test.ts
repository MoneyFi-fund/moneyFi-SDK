
// SPDX-License-Identifier: Apache-2.0

import {
  CHAIN_ID,
  MoneyFi,
} from "../../../src";
import { ChainSetting, CreateUserPayload, UserStatistic, UserStaticsParam, HasWalletAccountParam, TxPayloadDepositParam, TxPayloadWithdrawParam, ReqWithdrawPayload, WithdrawStatusResponse, SupportedChains, SupportedTokens, TxInitializationWalletAccountParam } from "../../../src/types";

describe("transaction", () => {
  let moneyFi: MoneyFi;
  let existWalletAccount: string;
  let usdcAptos = "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b";
  let client_url = "https://aptos-mainnet.public.blastapi.io";

  beforeEach(() => {
    let chainSetting: ChainSetting[] = [];
    chainSetting.push({
      chain_id: -1,
      custom_rpc_url: client_url
    });

    moneyFi = new MoneyFi(chainSetting);
    existWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f";
  });


  test("it should return tx deposit payload", async () => {
    let depositAmount = 1000;
    let depositParam: TxPayloadDepositParam = {
      sender: existWalletAccount,
      chain_id: -1,
      token_address: usdcAptos,
      amount: BigInt(depositAmount),
    }
    const transaction = await moneyFi.getDepositTxPayload(depositParam);
  });

  test("it should return user account should right", async () => {
    let newAptosAddress = "0x573c00ac17a17d3caa0eb9079d52085239dcf14de7e5de2c6554583fd82a3f11";

    let newUser: CreateUserPayload = {
      user_address: { Aptos: newAptosAddress },
      is_partnership: true,
    }
    let res = await moneyFi.createUser(newUser);
    expect(res.is_partnership).toBe(true);
  });

  test("it should return tx initialization account", async () => {
    let existWalletAccount = "0xfa309f53a3d16420dc0114ea131d44818b40419b81b44b0372e6f0a0d78947ba";
    let txInitializeWalletAccount: TxInitializationWalletAccountParam = {
      user_address: { Aptos: existWalletAccount },
    }
    let result = await moneyFi.getTxInitializationWalletAccount(txInitializeWalletAccount);
  });

  test("it should return tx withdraw payload", async () => {
    let existWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f";
    let depositAmount = 1000;
    let withdrawParam: TxPayloadDepositParam = {
      sender: existWalletAccount,
      chain_id: -1,
      token_address: usdcAptos,
      amount: BigInt(depositAmount),
    }
    const transaction = await moneyFi.getWithdrawTxPayload(withdrawParam);
  });


  test("it should return user statistics", async () => {
    const address = "0x31349f2d7d9aa2250a7becf4be83a46f2c5789e41dafcf7906ba10f28f2c30bf";
    let userStaticsParam: UserStaticsParam = {
      address: address,
      chain_id: CHAIN_ID.APTOS
    }
    const exist = await moneyFi.getUserStatistic(userStaticsParam);
    expect(exist).toBeDefined();
    expect(exist).toMatchObject<UserStatistic>({
      total_value: expect.any(Number),
      apr_avg: expect.any(Number),
      cumulative_yield_profits: expect.any(Number),
      idle_asset_value: expect.any(Number),
      pending_yield_earnings: expect.any(Number),
      total_deposited_liquidity: expect.any(Number),
      total_monetized_balance: expect.any(Number),
      total_withdrawn_liquidity: expect.any(Number),
    });
  }, 100000);

  test("it should return true with exist wallet account", async () => {
    let existWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f";
    let param: HasWalletAccountParam = {
      sender: existWalletAccount
    }
    const exist = await moneyFi.hasWalletAccount(param);
    expect(exist).toBe(true);
  });

  test("it should return false with non-exist wallet account", async () => {
    let nonExistWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c594e202ccb2c726151163c782037f";
    let param: HasWalletAccountParam = {
      sender: nonExistWalletAccount
    }
    const exist = await moneyFi.hasWalletAccount(param);
    expect(exist).toBe(false);
  });

  test("it should return withdraw status", async () => {
    const address = "0xecf0f2baef446955c8b0eeb086c2fbec7ab56a04ad5aaca8fa58a26b4e13dd67";
    const exist = await moneyFi.getWithdrawStatus(address);
    expect(exist).toEqual({ status: "done" });
  });

  test("it should return list of supported chains", async () => {
    const exist = await moneyFi.getSupportedChains();
  });

  test("it should return list of supported tokens", async () => {
    const exist = await moneyFi.getSupportedTokens();
  });
  test("it should return user infor", async () => {
    let existWalletAccount = "0xd5f05f40fcc6614e659a380c84eef1b34e735f7241ad31b5305d5a6996d803bf";

    const exist = await moneyFi.getUserInfor(existWalletAccount);
    expect(exist.address).toBe(existWalletAccount);
  });

}); 
