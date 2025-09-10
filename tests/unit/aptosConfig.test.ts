
// SPDX-License-Identifier: Apache-2.0

import {
  AptosConfig,
  AptosSettings,
  Network,
  NetworkToFaucetAPI,
  NetworkToNodeAPI,
  NetworkToIndexerAPI,
  AptosApiType,
} from "../../src";

describe("aptos config", () => {
  test("it should set urls based on a local network", async () => {
    const settings: AptosSettings = {
      network: Network.LOCAL,
    };
    const aptosConfig = new AptosConfig(settings);
    expect(aptosConfig.network).toEqual("local");
    expect(aptosConfig.getRequestUrl(AptosApiType.FULLNODE)).toBe(NetworkToNodeAPI[Network.LOCAL]);
    expect(aptosConfig.getRequestUrl(AptosApiType.FAUCET)).toBe(NetworkToFaucetAPI[Network.LOCAL]);
    expect(aptosConfig.getRequestUrl(AptosApiType.INDEXER)).toBe(NetworkToIndexerAPI[Network.LOCAL]);
  });

  test("it should set urls based on testnet", async () => {
    const settings: AptosSettings = {
      network: Network.TESTNET,
    };
    const aptosConfig = new AptosConfig(settings);
    expect(aptosConfig.network).toEqual("testnet");
    expect(aptosConfig.getRequestUrl(AptosApiType.FULLNODE)).toBe(NetworkToNodeAPI[Network.TESTNET]);
    expect(() => aptosConfig.getRequestUrl(AptosApiType.FAUCET)).toThrow();
    expect(aptosConfig.getRequestUrl(AptosApiType.INDEXER)).toBe(NetworkToIndexerAPI[Network.TESTNET]);
  });

  test("it should set urls based on mainnet", async () => {
    const settings: AptosSettings = {
      network: Network.MAINNET,
    };
    const aptosConfig = new AptosConfig(settings);
    expect(aptosConfig.network).toEqual("mainnet");
    expect(aptosConfig.getRequestUrl(AptosApiType.FULLNODE)).toBe(NetworkToNodeAPI[Network.MAINNET]);
    expect(() => aptosConfig.getRequestUrl(AptosApiType.FAUCET)).toThrow();
    expect(aptosConfig.getRequestUrl(AptosApiType.INDEXER)).toBe(NetworkToIndexerAPI[Network.MAINNET]);
  });
});
