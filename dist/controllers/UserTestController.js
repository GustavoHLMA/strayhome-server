"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
class UserTestController {
    async create(req, res, next) {
        try {
            const userTestData = DTOs_1.UserTest.parse(req.body);
            const existsUserTestWithEmail = await repositories_1.UserTestRepository.findByEmail(userTestData.email);
            if (existsUserTestWithEmail) {
                return res.status(400).json({ message: 'This email is already registred' });
            }
            const userTestDataWithHashedPassword = Object.assign(Object.assign({}, userTestData), { password: await (0, bcryptjs_1.hash)(userTestData.password, 6) });
            const userTest = await repositories_1.UserTestRepository.create(userTestDataWithHashedPassword);
            return res.status(201).json({ message: 'UserTest created', data: userTest });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { userTestId } = req.params;
            const userTest = await repositories_1.UserTestRepository.findById(userTestId);
            if (!userTest) {
                return res.status(404).json({ message: 'UserTest not found' });
            }
            return res.status(200).json({ data: userTest });
        }
        catch (error) {
            return next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const usersTest = await repositories_1.UserTestRepository.findAll();
            return res.status(200).json({ data: usersTest });
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { userTestId } = req.params;
            const userTestData = DTOs_1.UpdateUserTest.parse(req.body);
            const userTest = await repositories_1.UserTestRepository.update(userTestId, userTestData);
            return res.status(200).json({ message: 'UserTest updated', data: userTest });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { userTestId } = req.params;
            await repositories_1.UserTestRepository.delete(userTestId);
            return res.status(200).json({ message: 'UserTest deleted' });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new UserTestController();
