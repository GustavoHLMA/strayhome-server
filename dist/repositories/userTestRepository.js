"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class UserTestRepository {
    async create(data) {
        const userTest = await db_1.default.userTest.create({ data });
        return userTest;
    }
    async findByEmail(email) {
        const userTest = await db_1.default.userTest.findUnique({ where: { email } });
        return userTest;
    }
    async findById(id) {
        const userTest = await db_1.default.userTest.findUnique({ where: { id } });
        return userTest;
    }
    async update(id, data) {
        const userTest = await db_1.default.userTest.update({ where: { id }, data });
        return userTest;
    }
    async delete(id) {
        const userTest = await db_1.default.userTest.delete({ where: { id } });
        return userTest;
    }
    async findAll() {
        const usersTest = await db_1.default.userTest.findMany();
        return usersTest;
    }
}
exports.default = new UserTestRepository();
