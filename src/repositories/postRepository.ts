import { Prisma, Post } from '@prisma/client';
import prisma from '../db';

class PostRepository {
    async create(data: Prisma.PostCreateInput): Promise<Post> {

        if (!data.feed || !data.feed.connect || !data.feed.connect.id) {
            throw new Error('Feed ID is required to create a Post');
        }

        const post = await prisma.post.create({ 
            data: {
                media: data.media,
                description: data.description,
                feed: {
                    connect: { id: data.feed.connect.id },
                },
        }});
        return post;
    }

    async findById(id: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({ where: { id },
            include: {
                feed: true,
                comments: true
            }
        });
        return post;
    }

    async findByFeedId(feedId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({ where: { feedId },
            include: {
                feed: true,
                comments: true
            }
        })

        return posts
    }

    async findAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany();
        return posts;
    }

    async update (id: string, data: Prisma.PostUpdateInput): Promise<Post> {
        const post = await prisma.post.update({where: {id}, data})
        return post;
    }

    async delete (id: string): Promise <Post> {
        const post = await prisma.post.delete({where: {id}})
        return post
    }

}

export default new PostRepository();