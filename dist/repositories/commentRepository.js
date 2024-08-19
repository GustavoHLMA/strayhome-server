"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class CommentRepository {
    async create(data) {
        return await db_1.default.comment.create({ data });
    }
    async findById(id) {
        const comment = await db_1.default.comment.findUnique({ where: { id },
            include: {
                post: true,
                author: true
            }
        });
        return comment;
    }
    async findByPostId(postId) {
        const comments = await db_1.default.comment.findMany({ where: { postId },
            include: {
                post: true,
                author: true
            }
        });
        return comments;
    }
    async findAll() {
        const comments = await db_1.default.comment.findMany();
        return comments;
    }
    async update(id, data) {
        const comment = await db_1.default.comment.update({ where: { id }, data });
        return comment;
    }
    async delete(id) {
        const comment = await db_1.default.comment.delete({ where: { id } });
        return comment;
    }
}
exports.default = new CommentRepository();
