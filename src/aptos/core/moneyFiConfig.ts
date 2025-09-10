
import {
  MoneyFiSetting,
} from "../types";
import {
  Network,
} from "../utils/apiEndpoints";

/**
 * Represents the configuration settings for an Aptos SDK client instance.
 * This class allows customization of various endpoints and client settings.
 *
 * @example
 * ```typescript
 * import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
 *
 * async function runExample() {
 *     // Create a configuration for connecting to the Aptos testnet
 *     const config = new AptosConfig({ network: Network.TESTNET });
 *
 *     // Initialize the Aptos client with the configuration
 *     const aptos = new Aptos(config);
 *
 *     console.log("Aptos client initialized:", aptos);
 * }
 * runExample().catch(console.error);
 * ```
 * @group Client
 */
export class MoneyFiConfig {
  /**
   * The Network that this SDK is associated with. Defaults to DEVNET
   * @group Client
   */
  readonly network: Network;
  /**
   * Initializes an instance of the Aptos client with the specified settings.
   * This allows users to configure various aspects of the client, such as network and endpoints.
   *
   * @param settings - Optional configuration settings for the Aptos client.
   * @param settings.network - The network to connect to, defaults to `Network.DEVNET`.
   *
   * @example
   * ```typescript
   * import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
   *
   * async function runExample() {
   *     // Create a new Aptos client with default settings
   *     const config = new AptosConfig({ network: Network.TESTNET }); // Specify the network
   *     const aptos = new Aptos(config);
   *
   *     console.log("Aptos client initialized:", aptos);
   * }
   * runExample().catch(console.error);
   * ```
   * @group Client
   */
  constructor(settings?: MoneyFiSetting) {
    // If there are any endpoint overrides, they are custom networks, keep that in mind
      if (settings?.network === Network.CUSTOM) {
        console.info("Note: using CUSTOM network will require queries to lookup ChainId");
      } else if (!settings?.network) {
        throw new Error("Custom endpoints require a network to be specified");
      }
    this.network = settings?.network ?? Network.DEVNET;
  }
}
