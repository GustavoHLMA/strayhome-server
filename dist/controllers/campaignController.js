"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CampaignDTO_1 = require("../DTOs/CampaignDTO");
const campaignRepository_1 = __importDefault(require("../repositories/campaignRepository"));
const { ContractExecuteTransaction, ContractFunctionParameters, Hbar } = require("@hashgraph/sdk");
const hederaClient = require('../services/hederaClient');
class CampaignController {
    async create(req, res, next) {
        try {
            const campaignData = CampaignDTO_1.Campaign.parse(req.body);
            // Verifica se o CLIENT está configurado corretamente
            if (!hederaClient) {
                throw new Error("Hedera client is not initialized correctly");
            }
            // Verifica se o CONTRACT_ID está definido
            const contractId = process.env.CONTRACT_ID;
            if (!contractId) {
                throw new Error("CONTRACT_ID is not defined");
            }
            // Cria a campanha na Hedera
            const transaction = new ContractExecuteTransaction()
                .setContractId(contractId)
                .setGas(300000)
                .setFunction("createCampaign", new ContractFunctionParameters()
                .addString(campaignData.name)
                .addUint256(campaignData.target))
                .setMaxTransactionFee(new Hbar(2));
            // Executa a transação
            const txResponse = await transaction.execute(hederaClient);
            // Obtenha o transactionId diretamente da resposta da transação
            const transactionId = txResponse.transactionId;
            const campaignIdOnBlockchain = transactionId.toString();
            const receipt = await txResponse.getReceipt(hederaClient);
            console.log(receipt); // Inspecione o receipt aqui
            if (receipt.status.toString() !== "SUCCESS") {
                throw new Error("Failed to create campaign on Hedera");
            }
            const campaign = await campaignRepository_1.default.create(Object.assign(Object.assign({}, campaignData), { startDate: new Date(campaignData.startDate), deadline: new Date(campaignData.deadline), campaignIdOnBlockchain }));
            return res.status(201).json({ message: 'Campaign created', data: campaign });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { id } = req.params;
            const campaign = await campaignRepository_1.default.findById(id);
            if (!campaign) {
                return res.status(404).json({
                    message: 'Campaign not found'
                });
            }
            return res.status(200).json({
                data: campaign
            });
        }
        catch (error) {
            return next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const campaigns = await campaignRepository_1.default.findAll();
            return res.status(200).json({
                data: campaigns
            });
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const campaignData = CampaignDTO_1.UpdateCampaign.parse(req.body);
            const updatedCampaign = await campaignRepository_1.default.update(id, Object.assign(Object.assign({}, campaignData), { startDate: campaignData.startDate ? new Date(campaignData.startDate) : undefined, deadline: campaignData.deadline ? new Date(campaignData.deadline) : undefined }));
            return res.status(200).json({
                message: 'Campaign updated',
                data: updatedCampaign
            });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await campaignRepository_1.default.delete(id);
            return res.status(200).json({
                message: 'Campaign deleted'
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new CampaignController();
