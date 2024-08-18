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
        const campaign = await db_1.default.campaign.delete({
            where: { id },
        });
        return campaign;
    }
}
exports.default = new CampaignRepository();
