import { Request, Response, NextFunction } from 'express';
import { CommentRepository } from '../repositories';
import { Comment, UpdateComment } from '../DTOs';
import prisma from '../db';
import { Prisma } from '@prisma/client';

class CommentController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            const commentData = Comment.parse(req.body);

            
            const createCommentData: Prisma.CommentCreateInput = {
                content: commentData.content,
                author: { connect: { id: commentData.authorId } },
                post: { connect: { id: commentData.postId } },
            };

            
            const createdComment = await CommentRepository.create(createCommentData);

            
            return res.status(201).json({ message: 'Comment created', data: createdComment });
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
          const { commentId } = req.params;
    
          const comment = await CommentRepository.findById(commentId);
    
          if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
          }
    
          return res.status(200).json({ data: comment });
        } catch (error) {
          return next(error);
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
          const commetns = await CommentRepository.findAll();
    
          return res.status(200).json({ data: commetns });
        } catch (error) {
          return next(error);
        }
    }

    async readByPostId(req: Request, res: Response, next: NextFunction) {
        try {
            const { commentId } = req.params;

            if (!commentId) {
                return res.status(400).json({ message: 'FeedId is required' });
            }

            const comments = await CommentRepository.findByPostId(commentId);

            if (comments.length === 0) {
                return res.status(404).json({ message: 'No comments found for this feed' });
            }

            return res.status(200).json(comments);
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
          const { commentId } = req.params;
          const commentData = UpdateComment.parse(req.body);
    
          const updatedComment = await CommentRepository.update(commentId, commentData);
    
          return res.status(200).json({ message: 'Comment updated', data: updatedComment });
        } catch (error) {
          return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
          const { commentId } = req.params;
    
          await CommentRepository.delete(commentId);
    
          return res.status(200).json({ message: 'Comment deleted' });
        } catch (error) {
          return next(error);
        }
    }
}


export default new CommentController();