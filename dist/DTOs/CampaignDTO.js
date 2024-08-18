"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampaign = exports.Campaign = void 0;
const zod_1 = require("zod");
exports.Campaign = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'O nome deve ser uma string',
        required_error: 'O nome é obrigatório'
    })
        .min(1, 'O nome é obrigatório'),
    description: zod_1.z
        .string({
        invalid_type_error: 'A descrição deve ser uma string',
        required_error: 'A descrição é obrigatória'
    })
        .min(1, 'A descrição é obrigatória'),
    image: zod_1.z
        .string({
        invalid_type_error: 'A imagem deve ser uma string',
        required_error: 'A imagem é obrigatória'
    })
        .url({ message: 'A imagem deve ser uma URL válida' }),
    target: zod_1.z
        .number({
        invalid_type_error: 'O alvo deve ser um número',
        required_error: 'O alvo é obrigatório'
    })
        .min(0, 'O alvo deve ser um valor positivo'),
    startDate: zod_1.z
        .string({
        invalid_type_error: 'A data de início deve ser uma string',
        required_error: 'A data de início é obrigatória'
    })
        .refine(value => !isNaN(Date.parse(value)), 'Data de início inválida'),
    deadline: zod_1.z
        .string({
        invalid_type_error: 'A data de término deve ser uma string',
        required_error: 'A data de término é obrigatória'
    })
        .refine(value => !isNaN(Date.parse(value)), 'Data de término inválida'),
    creatorId: zod_1.z
        .string({
        invalid_type_error: 'O ID do criador deve ser uma string',
        required_error: 'O ID do criador é obrigatório'
    })
        .uuid({ message: 'O ID do criador deve ser um UUID válido' }),
    campaignIdOnBlockchain: zod_1.z
        .string()
        .optional(), // Adicionado como opcional
});
exports.UpdateCampaign = exports.Campaign.partial();
