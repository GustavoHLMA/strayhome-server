import { z } from 'zod';

export const User = z.object({
  name: z
    .string({
      invalid_type_error: 'O nome deve ser uma string',
      required_error: 'O nome é obrigatório',
    })
    .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
  birthdate: z
    .string({
      invalid_type_error: 'A data de nascimento deve ser uma string',
      required_error: 'A data de nascimento é obrigatória',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'A data de nascimento deve ser uma data válida no formato YYYY-MM-DD, como "1990-01-01"',
    }),
  phone: z
    .string({ invalid_type_error: 'O número de telefone deve ser uma string' })
    .regex(/^\+?[0-9]+$/, {
      message: 'O número de telefone deve conter apenas números',
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: 'O email deve ser uma string',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Endereço de email inválido' }),
  password: z
    .string({ invalid_type_error: 'A senha deve ser uma string' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  image: z
    .string({ invalid_type_error: 'A imagem deve ser uma string' })
    .url({ message: 'A imagem deve ser uma URL válida' })
    .optional(),
  animals: z.array(
    z.string({
      invalid_type_error: 'Os animais devem ser uma lista de IDs de strings',
    })
  ),
  campaigns: z.array(
    z.string({
      invalid_type_error: 'As campanhas devem ser uma lista de IDs de strings',
    })
  ),
  favoriteAnimals: z.array(
    z.string({
      invalid_type_error:
        'Os animais favoritos devem ser uma lista de IDs de strings',
    })
  ),
  favoriteCampaigns: z.array(
    z.string({
      invalid_type_error:
        'As campanhas favoritas devem ser uma lista de IDs de strings',
    })
  ),
  comments: z.array(
    z.string({
      invalid_type_error:
        'Os comentários devem ser uma lista de IDs de strings',
    })
  ),
});

export const UpdateUser = User.partial();
