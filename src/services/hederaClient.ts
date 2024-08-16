const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
require('dotenv').config();

const operatorId = process.env.OPERATOR_ID;
const privateKey = process.env.PRIVATE_KEY;

if (!operatorId || !privateKey) {
  throw new Error('OPERATOR_ID or PRIVATE_KEY env vars not set');
}

const client = Client.forTestnet();
client.setOperator(operatorId, privateKey);
client.setDefaultMaxTransactionFee(new Hbar(100));
client.setDefaultMaxQueryPayment(new Hbar(25));

const newAccountPrivateKey = PrivateKey.generateED25519(); 
const newAccountPublicKey = newAccountPrivateKey.publicKey;

async function createNewAccount() {
  const newAccount = await new AccountCreateTransaction()
  .setKey(newAccountPublicKey)
  .setInitialBalance(Hbar.fromTinybars(1000))
  .execute(client);

  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  console.log("The new account ID is: " + newAccountId);
}

async function checkBalance() {
  const balance = await new AccountBalanceQuery()
  .setAccountId(client.operatorAccountId)
  .execute(client);

  console.log(`The balance of the account is: ${balance.hbars.toString()}`);
}

createNewAccount();
checkBalance();

module.exports = client;
