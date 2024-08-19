"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class FeedRepository {
    async findAll() {
        const feeds = await db_1.default.feed.findMany();
        return feeds;
    }
    async findById(id) {
        if (!id) {
            throw new Error("Feed ID is required");
        }
        const feed = await db_1.default.feed.findUnique({
            where: { id },
            include: {
                posts: true,
                animal: true,
                campaign: true
            }
        });
        return feed;
    }
    async update(id, data) {
        return await db_1.default.feed.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const feed = await db_1.default.feed.delete({ where: { id } });
        return feed;
    }
}
exports.default = new FeedRepository();
