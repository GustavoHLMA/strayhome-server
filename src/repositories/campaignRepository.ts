import { Prisma, Campaign as CampaignModel } from '@prisma/client';
import prisma from '../db';

class CampaignRepository {
    async create(data: {
        name: string;
        description: string;
        image: string;
        target: number;
        startDate: Date;
        deadline: Date;
        creatorId: string;
        campaignIdOnBlockchain: string;
    }): Promise<CampaignModel> {
        const result = await prisma.$transaction(async (prisma) => {
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

    async findById(id: string): Promise<CampaignModel | null> {
        const campaign = await prisma.campaign.findUnique({
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

    async findAll(): Promise<CampaignModel[]> {
        const campaigns = await prisma.campaign.findMany({
            include: {
                creator: true,
                animals: true,
                favoritedBy: true,
                feed: true,
            },
        });
        return campaigns;
    }

    async update(id: string, data: Prisma.CampaignUpdateInput): Promise<CampaignModel> {
        const campaign = await prisma.campaign.update({
            where: { id },
            data,
        });
        return campaign;
    }

    async delete(id: string): Promise<CampaignModel> {
        const campaign = await prisma.campaign.delete({
            where: { id },
        });
        return campaign;
    }
}

export default new CampaignRepository();
