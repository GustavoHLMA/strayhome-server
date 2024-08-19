"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
class PostController {
    async create(req, res, next) {
        try {
            const postData = DTOs_1.Post.parse(req.body);
            const createdPost = await repositories_1.PostRepository.create({
                media: postData.media,
                description: postData.description,
                feed: {
                    connect: { id: postData.feedId },
                },
            });
            return res.status(201).json({ message: 'Post created', data: createdPost });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { postId } = req.params;
            const post = await repositories_1.PostRepository.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(200).json({ data: post });
        }
        catch (error) {
            return next(error);
        }
    }
    async readByFeedId(req, res, next) {
        try {
            const { feedId } = req.params;
            if (!feedId) {
                return res.status(400).json({ message: 'FeedId is required' });
            }
            const posts = await repositories_1.PostRepository.findByFeedId(feedId);
            if (posts.length === 0) {
                return res.status(404).json({ message: 'No posts found for this feed' });
            }
            return res.status(200).json(posts);
        }
        catch (error) {
            return next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const posts = await repositories_1.PostRepository.findAll();
            return res.status(200).json({ data: posts });
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { postId } = req.params;
            const postData = DTOs_1.UpdatePost.parse(req.body);
            const post = await repositories_1.PostRepository.update(postId, postData);
            return res.status(200).json({ message: 'Post updated', data: post });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { postId } = req.params;
            await repositories_1.PostRepository.delete(postId);
            return res.status(200).json({ message: 'Post deleted' });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new PostController();
