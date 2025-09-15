
// SPDX-License-Identifier: Apache-2.0

import {
  MoneyFiAptos,
} from "../../../src";
import {APTOS_ADDRESS} from "../../../src";
import { Deserializer, RawTransaction } from "@aptos-labs/ts-sdk";

describe("transaction", () => {
  test("it should return true with exist wallet account", async () => {
    let existWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f"; 

    const moneyFiAptos = new MoneyFiAptos();
    const exist = await moneyFiAptos.hasWalletAccount(existWalletAccount);
    expect(exist).toBe(true);
  });

  test("it should return false with non-exist wallet account", async () => {
    let nonExistWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f"; 
    const moneyFiAptos = new MoneyFiAptos();
    const exist = await moneyFiAptos.hasWalletAccount(nonExistWalletAccount);
    expect(exist).toBe(false);
  });

  test("it should return tx deposit payload", async () => {
    let existWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f"; 
    let depositAmount = 1000; 

    const moneyFiAptos = new MoneyFiAptos();
    const transaction = await moneyFiAptos.getDepositTxPayload(APTOS_ADDRESS.USDC, existWalletAccount, BigInt(depositAmount));
    console.log("transaction"); 
    console.log({transaction}); 
    const deserializer = new Deserializer(transaction);
    const deserializedTransaction = RawTransaction.deserialize(deserializer);

    console.log({deserializedTransaction})
  });


  test("it should return partnership account", async () => {
    let existWalletAccount = "0x0ae1e1817aaf1cd020151cd117843988d9c524e202ccb2c726151163c782037f"; 

    const moneyFiAptos = new MoneyFiAptos();
    let result = await moneyFiAptos.getOrCreatePartnership(existWalletAccount); 
    expect(result.is_partnership).toBe(true);
    expect(result.address).toBe(existWalletAccount);
  });

  test("it should return user account", async () => {
    let existWalletAccount = "0xfc3ce8487b26cbe85e7b0b4f5bc093e3669042632b1b9ee49aa46341f6415e02"; 

    const moneyFiAptos = new MoneyFiAptos();
    let result = await moneyFiAptos.getOrCreateUser(existWalletAccount); 
    expect(result.is_partnership).toBe(false);
    expect(result.address).toBe(existWalletAccount);
  });
  
  test("it should return tx initialization account", async () => {
    let existWalletAccount = "0xfa309f53a3d16420dc0114ea131d44818b40419b81b44b0372e6f0a0d78947ba"; 

    const moneyFiAptos = new MoneyFiAptos();
    let result = await moneyFiAptos.getTxInitializationWalletAccount(existWalletAccount); 
  });
    
});
