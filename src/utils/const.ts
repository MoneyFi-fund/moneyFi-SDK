import {AptosFunctionId} from "../types/types"; 

export const MoneyFiBaseApiUrl = "https://staging-api.moneyfi.fund"; 

export const MONEY_FI_APTOS_FUNCTION_ID: Record<string, AptosFunctionId> = {
  HAS_WALLET_ACCOUNT:
    "0x97c9ffc7143c5585090f9ade67d19ac95f3b3e7008ed86c73c947637e2862f56::wallet_account::has_wallet_account",
  DEPOSIT:
    "0x97c9ffc7143c5585090f9ade67d19ac95f3b3e7008ed86c73c947637e2862f56::vault::deposit",
  WITHDRAW:
      "0x97c9ffc7143c5585090f9ade67d19ac95f3b3e7008ed86c73c947637e2862f56::vault::withdraw",
};

export const APTOS_ADDRESS = {
 VAULT_CONTACT_APTOS: "0x97c9ffc7143c5585090f9ade67d19ac95f3b3e7008ed86c73c947637e2862f56", 
 USDC: "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b", 
 USDT: "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
}