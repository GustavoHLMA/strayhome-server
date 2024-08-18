import { z } from 'zod';

export const Animal = z.object({
    name: z
        .string({
            invalid_type_error: 'O nome deve ser uma string',
            required_error: 'O nome é obrigatório'
        })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
    species: z
        .string({
            invalid_type_error: 'A espécie deve ser uma string',
            required_error: 'A espécie é obrigatória'
        })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
    image: z
        .string()
        .url({ message: 'A imagem deve ser uma URL válida' }),
    bio: z
        .string({
            invalid_type_error: 'A bio deve ser uma string',
            required_error: 'A bio é obrigatória'
        }),
    gender: z
        .string({
            invalid_type_error: 'O gênero deve ser uma string',
            required_error: 'O gênero é obrigatório'
        }),
    ownerId: z
        .string({
            invalid_type_error: 'O ID do dono deve ser uma string',
            required_error: 'O ID do dono é obrigatório'
        })
        .uuid({ message: 'O ID do dono deve ser um UUID válido' }),
    statusAdoption: z
        .boolean({
            invalid_type_error: 'O status de adoção deve ser um booleano',
            required_error: 'O status de adoção é obrigatório'
        }) 

})

export const UpdateAnimal = Animal.partial();