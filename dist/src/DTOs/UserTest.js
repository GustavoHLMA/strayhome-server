"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserTest = exports.UserTest = void 0;
const zod_1 = require("zod");
exports.UserTest = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'O nome deve ser uma string',
        required_error: 'O nome é obrigatório',
    })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
    phone: zod_1.z
        .string({ invalid_type_error: 'O número de telefone deve ser uma string' })
        .regex(/^\+?[0-9]+$/, {
        message: 'O número de telefone deve conter apenas números',
    })
        .optional(),
    email: zod_1.z
        .string({
        invalid_type_error: 'O email deve ser uma string',
        required_error: 'O email é obrigatório',
    })
        .email({ message: 'Endereço de email inválido' }),
    password: zod_1.z
        .string({ invalid_type_error: 'A senha deve ser uma string' })
        .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});
exports.UpdateUserTest = exports.UserTest.partial();
