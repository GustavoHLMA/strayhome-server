"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenRepository {
    generateAccessToken(id, expiresIn) {
        const generatedToken = jsonwebtoken_1.default.sign({ id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn,
        });
        return generatedToken;
    }
    generateRefreshToken(id, expiresIn) {
        const generatedToken = jsonwebtoken_1.default.sign({ id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn,
        });
        return generatedToken;
    }
    verifyAccessToken(token) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        return verifiedToken;
    }
    verifyRefreshToken(token) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        return verifiedToken;
    }
}
exports.default = new TokenRepository();
