import { Prisma, Feed } from '@prisma/client';
import prisma from '../db';

class FeedRepository {

    async findAll(): Promise<Feed[]> {
        const feeds = await prisma.feed.findMany();
        return feeds;
    }

    async findById(id: string): Promise<Feed | null> {

        if (!id) {
            throw new Error("Feed ID is required");
        }
        const feed =  await prisma.feed.findUnique({
            where: { id }, 
            include: {
                posts: true
            }
        });
        return feed
    }

    async update(id: string, data: Prisma.FeedUpdateInput): Promise<Feed> {
        return await prisma.feed.update({
            where: { id },
            data,
        });
    }

    async delete (id: string): Promise <Feed> {
        const feed = await prisma.feed.delete({where: {id}})
        return feed;
    }
}

export default new FeedRepository();
