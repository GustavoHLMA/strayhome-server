"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class CampaignRepository {
    async create(data) {
        const campaign = await db_1.default.campaign.create({ data });
        return campaign;
    }
    async findById(id) {
        const campaign = await db_1.default.campaign.findUnique({
            where: { id },
            include: {
                creator: true,
                feed: true,
                animals: true,
            },
        });
        return campaign;
    }
    async findAll() {
        const campaigns = await db_1.default.campaign.findMany({
            include: {
                creator: true,
                feed: true,
                animals: true,
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
