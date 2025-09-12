import { MoneyFiAptos } from "../src/aptos/transactions/transaction";
async function main() {
    const address = "0xd5f05f40fcc6614e659a380c84eef1b34e735f7241ad31b5305d5a6996d803bf";
    const moneyFi = new MoneyFiAptos();
    const exist = await moneyFi.hasWalletAccount(address);
    console.log(exist);
}
main().then();
//# sourceMappingURL=index.js.map