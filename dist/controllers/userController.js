"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
class UserController {
    async create(req, res, next) {
        try {
            const userData = DTOs_1.User.parse(req.body);
            const userDataWithHashedPassword = Object.assign(Object.assign({}, userData), { password: await (0, bcryptjs_1.hash)(userData.password, 6) });
            const user = await repositories_1.UserRepository.create(userDataWithHashedPassword);
            return res.status(201).json({ message: 'User created', data: user });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await repositories_1.UserRepository.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ data: user });
        }
        catch (error) {
            return next(error);
        }
    }
    async readByEmail(req, res, next) {
        try {
            const { userEmail } = req.params;
            const user = await repositories_1.UserRepository.findByEmail(userEmail);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ data: user });
        }
        catch (error) {
            return next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const users = await repositories_1.UserRepository.findAll();
            return res.status(200).json({ data: users });
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const userData = DTOs_1.UpdateUser.parse(req.body);
            const user = await repositories_1.UserRepository.update(userId, userData);
            return res.status(200).json({ message: 'User updated', data: user });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await repositories_1.UserRepository.delete(userId);
            return res.status(200).json({ message: 'User deleted' });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new UserController();
