"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserTestRoutes_1 = __importDefault(require("./UserTestRoutes"));
const router = (0, express_1.Router)();
router.use('/userTest', UserTestRoutes_1.default);
router.route('/').get((_, res) => {
    res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});
exports.default = router;
