import { Prisma, Comment } from '@prisma/client';
import prisma from '../db';

class CommentRepository {
    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
        return await prisma.comment.create({ data });
    }

    async findById(id: string): Promise<Comment | null> {
        const comment = await prisma.comment.findUnique({ where: { id },
            include: {
                post: true,
                author: true
            }
        });
        return comment;
    }

    async findByPostId(postId: string): Promise<Comment[]> {
        const comments = await prisma.comment.findMany({where: {postId},
            include:{
                post: true,
                author: true
            }
        })

        return comments
    }

    async findAll(): Promise<Comment[]> {
        const comments = await prisma.comment.findMany();
        return comments;
    }

    async update (id: string, data: Prisma.CommentUpdateInput): Promise<Comment> {
        const comment = await prisma.comment.update({where: {id}, data})
        return comment;
    }

    async delete (id: string): Promise <Comment> {
        const comment = await prisma.comment.delete({where: {id}})
        return comment
    }
}



export default new CommentRepository();