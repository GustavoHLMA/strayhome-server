"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePost = exports.Post = void 0;
const zod_1 = require("zod");
exports.Post = zod_1.z.object({
    media: zod_1.z
        .string()
        .url({ message: 'A imagem deve ser uma URL válida' }),
    description: zod_1.z.string().optional(),
    feedId: zod_1.z.string().uuid().refine((val) => val !== '', {
        message: 'O ID do feed é obrigatório',
    })
});
exports.UpdatePost = exports.Post.partial();
