"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@hashgraph/sdk");
async function testConnection() {
    try {
        const balance = await new sdk_1.AccountBalanceQuery()
            .setAccountId(client.operatorAccountId)
            .execute(client);
        console.log(`The balance of the account is: ${balance.hbars.toString()}`);
    }
    catch (error) {
        console.error("Error connecting to Hedera:", error);
    }
}
testConnection();
