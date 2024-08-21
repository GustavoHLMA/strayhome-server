"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class CampaignRepository {
    async create(data) {
        const result = await db_1.default.$transaction(async (prisma) => {
            // Cria o feed associado à campanha
            const feed = await prisma.feed.create({
                data: {},
            });
            // Cria a campanha associada ao feed recém-criado
            const campaign = await prisma.campaign.create({
                data: {
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    target: data.target,
                    startDate: data.startDate,
                    deadline: data.deadline,
                    campaignIdOnBlockchain: data.campaignIdOnBlockchain,
                    creator: {
                        connect: { id: data.creatorId },
                    },
                    feed: {
                        connect: { id: feed.id },
                    },
                },
            });
            await prisma.feed.update({
                where: { id: feed.id },
                data: {
                    campaignId: campaign.id,
                },
            });
            return campaign;
        });
        return result;
    }
    async findById(id) {
        const campaign = await db_1.default.campaign.findUnique({
            where: { id },
            include: {
                creator: true,
                animals: true,
                favoritedBy: true,
                feed: true,
            },
        });
        return campaign;
    }
    async findAll() {
        const campaigns = await db_1.default.campaign.findMany({
            include: {
                creator: true,
                animals: true,
                favoritedBy: true,
                feed: true,
            },
        });
        return campaigns;
    }
    async update(id, data) {
        const campaign = await db_1.default.campaign.update({
            where: { id },
            data,
        });
        return campaign;
    }
    async delete(id) {
        const result = await db_1.default.$transaction(async (prisma) => {
            const campaignExists = await prisma.campaign.findUnique({
                where: { id },
            });
            if (!campaignExists) {
                throw new Error('Campanha já foi deletada ou não existe');
            }
            console.log('Campanha encontrada:', campaignExists);
            if (campaignExists.feedId) {
                console.log('Deletando posts associados ao feed ID:', campaignExists.feedId);
                await prisma.post.deleteMany({
                    where: { feedId: campaignExists.feedId },
                });
                console.log('Deletando feed com ID:', campaignExists.feedId);
                try {
                    await prisma.feed.delete({
                        where: { id: campaignExists.feedId },
                    });
                }
                catch (error) {
                    console.log('Erro ao deletar o feed:', error);
                    throw new Error('Erro ao deletar o feed associado.');
                }
            }
            const campaignCheck = await prisma.campaign.findUnique({
                where: { id },
            });
            if (!campaignCheck) {
                console.log('Campanha não encontrada na segunda verificação.');
                throw new Error('Campanha já foi deletada ou não existe (2ª verificação)');
            }
            console.log('Deletando campanha com ID:', id);
            try {
                const campaign = await prisma.campaign.delete({
                    where: { id },
                });
                console.log('Campanha deletada com sucesso:', campaign);
                return campaign;
            }
            catch (error) {
                if (error.code === 'P2025') {
                    console.log('A campanha já foi deletada ou não existe.');
                }
                else {
                    console.log('Erro ao deletar a campanha:', error);
                    throw new Error('Erro ao deletar a campanha.');
                }
            }
        });
        if (!result) {
            throw new Error('A transação não retornou uma campanha válida.');
        }
        return result;
    }
}
exports.default = new CampaignRepository();
