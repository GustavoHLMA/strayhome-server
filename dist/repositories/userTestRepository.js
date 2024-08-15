"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class UserTestRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTest = yield db_1.default.userTest.create({ data });
            return userTest;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTest = yield db_1.default.userTest.findUnique({ where: { email } });
            return userTest;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTest = yield db_1.default.userTest.findUnique({ where: { id } });
            return userTest;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTest = yield db_1.default.userTest.update({ where: { id }, data });
            return userTest;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTest = yield db_1.default.userTest.delete({ where: { id } });
            return userTest;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersTest = yield db_1.default.userTest.findMany();
            return usersTest;
        });
    }
}
exports.default = new UserTestRepository();
