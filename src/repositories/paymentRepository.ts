// src/repositories/paymentRepository.ts
import prisma from '../db';
const { ContractExecuteTransaction, ContractFunctionParameters, Hbar } = require("@hashgraph/sdk");
const hederaClient = require('../services/hederaClient');

class PaymentRepository {
    async makePayment(data: { campaignId: string; amount: number; userId: string }) {
        // Recupera a campanha do banco de dados
        const campaign = await prisma.campaign.findUnique({
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
            .setFunction(
                "donateToCampaign",
                new ContractFunctionParameters()
                    .addUint256(data.campaignId)
            )
            .setPayableAmount(hbarAmount);

        // Executa a transação
        const txResponse = await transaction.execute(hederaClient);
        const receipt = await txResponse.getReceipt(hederaClient);

        if (receipt.status.toString() !== "SUCCESS") {
            throw new Error("Falha ao processar o pagamento na Hedera");
        }

        // Atualiza o valor arrecadado na campanha no banco de dados
        const updatedCampaign = await prisma.campaign.update({
            where: { id: data.campaignId },
            data: { amountCollected: { increment: data.amount } },
        });

        return updatedCampaign;
    }
}

export default new PaymentRepository();
