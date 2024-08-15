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
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
class UserTestController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userTestData = DTOs_1.UserTest.parse(req.body);
                const existsUserTestWithEmail = yield repositories_1.UserTestRepository.findByEmail(userTestData.email);
                if (existsUserTestWithEmail) {
                    return res.status(400).json({ message: 'This email is already registred' });
                }
                const userTestDataWithHashedPassword = Object.assign(Object.assign({}, userTestData), { password: yield (0, bcryptjs_1.hash)(userTestData.password, 6) });
                const userTest = yield repositories_1.UserTestRepository.create(userTestDataWithHashedPassword);
                return res.status(201).json({ message: 'UserTest created', data: userTest });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userTestId } = req.params;
                const userTest = yield repositories_1.UserTestRepository.findById(userTestId);
                if (!userTest) {
                    return res.status(404).json({ message: 'UserTest not found' });
                }
                return res.status(200).json({ data: userTest });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    readAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersTest = yield repositories_1.UserTestRepository.findAll();
                return res.status(200).json({ data: usersTest });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userTestId } = req.params;
                const userTestData = DTOs_1.UpdateUserTest.parse(req.body);
                const userTest = yield repositories_1.UserTestRepository.update(userTestId, userTestData);
                return res.status(200).json({ message: 'UserTest updated', data: userTest });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userTestId } = req.params;
                yield repositories_1.UserTestRepository.delete(userTestId);
                return res.status(200).json({ message: 'UserTest deleted' });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = new UserTestController();
