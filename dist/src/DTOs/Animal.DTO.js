"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnimal = exports.Animal = void 0;
const zod_1 = require("zod");
exports.Animal = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'O nome deve ser uma string',
        required_error: 'O nome é obrigatório'
    })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
    species: zod_1.z
        .string({
        invalid_type_error: 'A espécie deve ser uma string',
        required_error: 'A espécie é obrigatória'
    })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
    image: zod_1.z
        .string()
        .url({ message: 'A imagem deve ser uma URL válida' }),
    bio: zod_1.z
        .string({
        invalid_type_error: 'A bio deve ser uma string',
        required_error: 'A bio é obrigatória'
    }),
    gender: zod_1.z
        .string({
        invalid_type_error: 'O gênero deve ser uma string',
        required_error: 'O gênero é obrigatório'
    }),
    ownerId: zod_1.z
        .string({
        invalid_type_error: 'O ID do dono deve ser uma string',
        required_error: 'O ID do dono é obrigatório'
    })
        .uuid({ message: 'O ID do dono deve ser um UUID válido' })
});
exports.UpdateAnimal = exports.Animal.partial();
