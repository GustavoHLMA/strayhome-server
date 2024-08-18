"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class UserRepository {
    async create(data) {
        const user = await db_1.default.user.create({ data });
        return user;
    }
    async findById(id) {
        const user = await db_1.default.user.findUnique({ where: { id },
            include: {
                animals: true,
                campaigns: true,
                favoriteAnimals: true,
                favoriteCampaigns: true,
                comments: true,
            }, });
        return user;
    }
    async findAll() {
        const users = await db_1.default.user.findMany();
        return users;
    }
    async update(id, data) {
        const user = await db_1.default.user.update({ where: { id }, data });
        return user;
    }
    async delete(id) {
        const user = await db_1.default.user.delete({ where: { id } });
        return user;
    }
}
exports.default = new UserRepository();
