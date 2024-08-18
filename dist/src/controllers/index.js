"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = exports.feedController = exports.animalController = exports.userController = exports.UserTestController = void 0;
const animalController_1 = __importDefault(require("./animalController"));
exports.animalController = animalController_1.default;
const feedController_1 = __importDefault(require("./feedController"));
exports.feedController = feedController_1.default;
const userController_1 = __importDefault(require("./userController"));
exports.userController = userController_1.default;
const LoginController_1 = __importDefault(require("./LoginController"));
exports.LoginController = LoginController_1.default;
const UserTestController_1 = __importDefault(require("./UserTestController"));
exports.UserTestController = UserTestController_1.default;
