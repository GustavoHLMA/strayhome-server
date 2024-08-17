"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', controllers_1.LoginController.login);
authRouter.get('/', (req, res) => {
    res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});
authRouter.patch('/refresh', controllers_1.LoginController.refresh);
authRouter.delete('/logout', controllers_1.LoginController.logout);
exports.default = authRouter;
