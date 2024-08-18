import {
    Request,
    Response,
    NextFunction
} from 'express';
import {
    Campaign,
    UpdateCampaign
} from '../DTOs/CampaignDTO';
import campaignRepository from '../repositories/campaignRepository';
const {
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar
} = require("@hashgraph/sdk");
const hederaClient = require('../services/hederaClient');

class CampaignController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const campaignData = Campaign.parse(req.body);

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
                    .addUint256(campaignData.target)
                )
                .setMaxTransactionFee(new Hbar(2));

            // Executa a transação
            const txResponse = await transaction.execute(hederaClient);
            const receipt = await txResponse.getReceipt(hederaClient);
            console.log(receipt); // Inspecione o receipt aqui
            
            if (receipt.status.toString() !== "SUCCESS") {
                throw new Error("Failed to create campaign on Hedera");
            }
            
            // Acesse o contractId e converta-o para string
            const contractIdOnBlockchain = receipt.contractId.toString();
            
            const campaign = await campaignRepository.create({
                ...campaignData,
                startDate: new Date(campaignData.startDate),
                deadline: new Date(campaignData.deadline),
                campaignIdOnBlockchain: contractIdOnBlockchain,
            });
            
            return res.status(201).json({ message: 'Campaign created', data: campaign });
            
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                id
            } = req.params;

            const campaign = await campaignRepository.findById(id);

            if (!campaign) {
                return res.status(404).json({
                    message: 'Campaign not found'
                });
            }

            return res.status(200).json({
                data: campaign
            });
        } catch (error) {
            return next(error);
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
            const campaigns = await campaignRepository.findAll();
            return res.status(200).json({
                data: campaigns
            });
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                id
            } = req.params;
            const campaignData = UpdateCampaign.parse(req.body);

            const updatedCampaign = await campaignRepository.update(id, {
                ...campaignData,
                startDate: campaignData.startDate ? new Date(campaignData.startDate) : undefined,
                deadline: campaignData.deadline ? new Date(campaignData.deadline) : undefined,
            });

            return res.status(200).json({
                message: 'Campaign updated',
                data: updatedCampaign
            });
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                id
            } = req.params;

            await campaignRepository.delete(id);

            return res.status(200).json({
                message: 'Campaign deleted'
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default new CampaignController();