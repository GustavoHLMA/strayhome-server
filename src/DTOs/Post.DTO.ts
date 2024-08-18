import { z } from 'zod';

export const Post =  z.object({
    media: z
        .string()
        .url({ message: 'A imagem deve ser uma URL válida' }),
    description: z.string().optional(),
    feedId: z.string().uuid().refine(
        (val) => val !== '',
        {
            message: 'O ID do feed é obrigatório',
        }
    )
})

export const UpdatePost = Post.partial();