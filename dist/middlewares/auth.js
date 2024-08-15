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
exports.default = auth;
const repositories_1 = require("../repositories");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authToken = req.headers.authorization;
            if (!authToken) {
                next({
                    status: 401,
                    message: 'Unauthorized.',
                });
            }
            else {
                const [, token] = authToken.split(' ');
                repositories_1.TokenRepository.verifyAccessToken(token);
                next();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            res.status(401).send({ error: error.message });
        }
    });
}
