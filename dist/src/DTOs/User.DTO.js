"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.User = void 0;
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
exports.User = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'O nome deve ser uma string',
        required_error: 'O nome é obrigatório'
    })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
    birthdate: zod_1.z
        .string({
        invalid_type_error: 'A data de nascimento deve ser uma data válida',
        required_error: 'A data de nascimento é obrigatória'
    })
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'A data de nascimento deve estar no formato yyyy-mm-dd',
    })
        .transform((value) => new Date(value)) // Converte a string para Date
        .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de nascimento deve ser uma data válida',
    })
        .refine((date) => (0, date_fns_1.isBefore)(date, new Date()), {
        message: 'A data de nascimento deve ser no passado',
    })
        .refine((date) => {
        const eighteenYearsAgo = (0, date_fns_1.subYears)(new Date(), 18);
        return (0, date_fns_1.isBefore)(date, eighteenYearsAgo);
    }, {
        message: 'Você deve ter pelo menos 18 anos',
    }),
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
    image: zod_1.z
        .string()
        .url({ message: 'A imagem deve ser uma URL válida' })
        .optional(),
});
exports.UpdateUser = exports.User.partial();
