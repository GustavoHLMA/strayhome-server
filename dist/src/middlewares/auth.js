"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const repositories_1 = require("../repositories");
async function auth(req, res, next) {
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
}
