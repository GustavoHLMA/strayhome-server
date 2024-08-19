"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComment = exports.Comment = void 0;
const zod_1 = require("zod");
exports.Comment = zod_1.z.object({
    content: zod_1.z
        .string().min(1, { message: 'O conteúdo do comentário é obrigatório' }),
    authorId: zod_1.z
        .string().uuid({ message: 'O ID do autor deve ser um UUID válido' }),
    postId: zod_1.z
        .string().uuid({ message: 'O ID do post deve ser um UUID válido' }),
});
exports.UpdateComment = exports.Comment.partial();
