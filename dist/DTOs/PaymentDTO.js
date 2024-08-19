"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDTO = void 0;
const zod_1 = require("zod");
exports.PaymentDTO = zod_1.z.object({
    campaignId: zod_1.z.string().uuid('ID da campanha inválido'),
    amount: zod_1.z.number().positive('O valor deve ser maior que 0'),
    userId: zod_1.z.string().uuid('ID do usuário inválido'),
});
