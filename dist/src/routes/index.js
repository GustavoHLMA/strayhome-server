"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserTestRoutes_1 = __importDefault(require("./UserTestRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const animalRoutes_1 = __importDefault(require("./animalRoutes"));
const feedRoutes_1 = __importDefault(require("./feedRoutes"));
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const campaignRoutes_1 = __importDefault(require("./campaignRoutes"));
const router = (0, express_1.Router)();
router.use('/userTest', UserTestRoutes_1.default);
router.use('/auth', AuthRoutes_1.default);
router.use('/user', userRoutes_1.default);
router.use('/animal', animalRoutes_1.default);
router.use('/feed', feedRoutes_1.default);
router.use('/campaign', campaignRoutes_1.default);
router.route('/').get((_, res) => {
    res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});
exports.default = router;
