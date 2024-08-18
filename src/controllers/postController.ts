import { Request, Response, NextFunction } from 'express';
import { PostRepository } from '../repositories';
import { Post, UpdatePost } from '../DTOs';
import prisma from '../db';

class PostController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const postData = Post.parse(req.body);

            const createdPost = await PostRepository.create({
                media: postData.media,
                description: postData.description,
                feed: {
                    connect: { id: postData.feedId },
                },
            });

            return res.status(201).json({ message: 'Post created', data: createdPost });

        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
          const { postId } = req.params;
    
          const post = await PostRepository.findById(postId);
    
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
    
          return res.status(200).json({ data: post });
        } catch (error) {
          return next(error);
        }
    }

    async readByFeedId(req: Request, res: Response, next: NextFunction) {
        try {
            const { feedId } = req.params;

            if (!feedId) {
                return res.status(400).json({ message: 'FeedId is required' });
            }

            const posts = await PostRepository.findByFeedId(feedId);

            if (posts.length === 0) {
                return res.status(404).json({ message: 'No posts found for this feed' });
            }

            return res.status(200).json(posts);
        } catch (error) {
            return next(error);
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
          const posts = await PostRepository.findAll();
    
          return res.status(200).json({ data: posts });
        } catch (error) {
          return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
          const { postId } = req.params;
          const postData = UpdatePost.parse(req.body);
    
          const post = await PostRepository.update(postId, postData);
    
          return res.status(200).json({ message: 'Post updated', data: post });
        } catch (error) {
          return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
          const { postId } = req.params;
    
          await PostRepository.delete(postId);
    
          return res.status(200).json({ message: 'Post deleted' });
        } catch (error) {
          return next(error);
        }
    }

}


export default new PostController();