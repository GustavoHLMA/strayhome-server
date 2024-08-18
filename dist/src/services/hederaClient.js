"use strict";
const { Client, PrivateKey } = require("@hashgraph/sdk");
require('dotenv').config();
const operatorId = process.env.OPERATOR_ID;
const privateKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY);
if (!operatorId || !privateKey) {
    throw new Error('OPERATOR_ID or PRIVATE_KEY env vars not set');
}
const client = Client.forTestnet();
client.setOperator(operatorId, privateKey);
console.log("Hedera client configured successfully");
module.exports = client;
