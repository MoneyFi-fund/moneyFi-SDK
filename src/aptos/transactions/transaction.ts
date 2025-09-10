
// SPDX-License-Identifier: Apache-2.0
import { AptosConfig } from "@aptos-labs/ts-sdk";

export class MoneyFiAptos {
  readonly aptosConfig: AptosConfig;

  constructor(config: AptosConfig) {
   this.aptosConfig = config; 
  }
}

