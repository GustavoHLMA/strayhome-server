"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/paymentRepository.ts
const db_1 = __importDefault(require("../db"));
const { ContractExecuteTransaction, ContractFunctionParameters, Hbar } = require("@hashgraph/sdk");
const hederaClient = require('../services/hederaClient');
class PaymentRepository {
    async makePayment(data) {
        // Recupera a campanha do banco de dados
        const campaign = await db_1.default.campaign.findUnique({
            where: { id: data.campaignId },
        });
        if (!campaign) {
            throw new Error('Campanha não encontrada');
        }
        // Converte o valor para Hbar
        const hbarAmount = new Hbar(data.amount);
        // Cria a transação de doação no contrato inteligente
        const transaction = new ContractExecuteTransaction()
            .setContractId(campaign.campaignIdOnBlockchain)
            .setGas(100000)
            .setFunction("donateToCampaign", new ContractFunctionParameters()
            .addUint256(data.campaignId))
            .setPayableAmount(hbarAmount);
        // Executa a transação
        const txResponse = await transaction.execute(hederaClient);
        const receipt = await txResponse.getReceipt(hederaClient);
        if (receipt.status.toString() !== "SUCCESS") {
            throw new Error("Falha ao processar o pagamento na Hedera");
        }
        // Atualiza o valor arrecadado na campanha no banco de dados
        const updatedCampaign = await db_1.default.campaign.update({
            where: { id: data.campaignId },
            data: { amountCollected: { increment: data.amount } },
        });
        return updatedCampaign;
    }
}
exports.default = new PaymentRepository();
