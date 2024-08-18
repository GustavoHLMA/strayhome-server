import { z } from 'zod';

export const Comment = z.object({
    content: z
        .string().min(1, 
            { message: 'O conteúdo do comentário é obrigatório' }),
    authorId: z
        .string().uuid(
            { message: 'O ID do autor deve ser um UUID válido' }),
    postId: z
        .string().uuid(
            { message: 'O ID do post deve ser um UUID válido' }),

})



export const UpdateComment = Comment.partial();