"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = exports.CommentController = exports.PostController = exports.LoginController = exports.FeedController = exports.AnimalController = exports.UserController = exports.UserTestController = void 0;
const animalController_1 = __importDefault(require("./animalController"));
exports.AnimalController = animalController_1.default;
const feedController_1 = __importDefault(require("./feedController"));
exports.FeedController = feedController_1.default;
const userController_1 = __importDefault(require("./userController"));
exports.UserController = userController_1.default;
const LoginController_1 = __importDefault(require("./LoginController"));
exports.LoginController = LoginController_1.default;
const UserTestController_1 = __importDefault(require("./UserTestController"));
exports.UserTestController = UserTestController_1.default;
const postController_1 = __importDefault(require("./postController"));
exports.PostController = postController_1.default;
const commentController_1 = __importDefault(require("./commentController"));
exports.CommentController = commentController_1.default;
const campaignController_1 = __importDefault(require("./campaignController"));
exports.CampaignController = campaignController_1.default;
