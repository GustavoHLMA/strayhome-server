"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
class CommentController {
    async create(req, res, next) {
        try {
            const commentData = DTOs_1.Comment.parse(req.body);
            const createCommentData = {
                content: commentData.content,
                author: { connect: { id: commentData.authorId } },
                post: { connect: { id: commentData.postId } },
            };
            const createdComment = await repositories_1.CommentRepository.create(createCommentData);
            return res.status(201).json({ message: 'Comment created', data: createdComment });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { commentId } = req.params;
            const comment = await repositories_1.CommentRepository.findById(commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            return res.status(200).json({ data: comment });
        }
        catch (error) {
            return next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const commetns = await repositories_1.CommentRepository.findAll();
            return res.status(200).json({ data: commetns });
        }
        catch (error) {
            return next(error);
        }
    }
    async readByPostId(req, res, next) {
        try {
            const { commentId } = req.params;
            if (!commentId) {
                return res.status(400).json({ message: 'FeedId is required' });
            }
            const comments = await repositories_1.CommentRepository.findByPostId(commentId);
            if (comments.length === 0) {
                return res.status(404).json({ message: 'No comments found for this feed' });
            }
            return res.status(200).json(comments);
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { commentId } = req.params;
            const commentData = DTOs_1.UpdateComment.parse(req.body);
            const updatedComment = await repositories_1.CommentRepository.update(commentId, commentData);
            return res.status(200).json({ message: 'Comment updated', data: updatedComment });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { commentId } = req.params;
            await repositories_1.CommentRepository.delete(commentId);
            return res.status(200).json({ message: 'Comment deleted' });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new CommentController();
