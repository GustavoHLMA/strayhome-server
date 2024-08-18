import { AccountBalanceQuery } from '@hashgraph/sdk';

async function testConnection() {
  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(client.operatorAccountId!)
      .execute(client);

    console.log(`The balance of the account is: ${balance.hbars.toString()}`);
  } catch (error) {
    console.error("Error connecting to Hedera:", error);
  }
}

testConnection();
