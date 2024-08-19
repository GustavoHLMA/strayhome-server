"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class PostRepository {
    async create(data) {
        if (!data.feed || !data.feed.connect || !data.feed.connect.id) {
            throw new Error('Feed ID is required to create a Post');
        }
        const post = await db_1.default.post.create({
            data: {
                media: data.media,
                description: data.description,
                feed: {
                    connect: { id: data.feed.connect.id },
                },
            }
        });
        return post;
    }
    async findById(id) {
        const post = await db_1.default.post.findUnique({ where: { id },
            include: {
                feed: true,
                comments: true
            }
        });
        return post;
    }
    async findByFeedId(feedId) {
        const posts = await db_1.default.post.findMany({ where: { feedId },
            include: {
                feed: true,
                comments: true
            }
        });
        return posts;
    }
    async findAll() {
        const posts = await db_1.default.post.findMany();
        return posts;
    }
    async update(id, data) {
        const post = await db_1.default.post.update({ where: { id }, data });
        return post;
    }
    async delete(id) {
        const post = await db_1.default.post.delete({ where: { id } });
        return post;
    }
}
exports.default = new PostRepository();
