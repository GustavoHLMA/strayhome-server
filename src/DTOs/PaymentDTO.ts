import { z } from 'zod';

export const PaymentDTO = z.object({
    campaignId: z.string().uuid('ID da campanha inválido'),
    amount: z.number().positive('O valor deve ser maior que 0'),
    userId: z.string().uuid('ID do usuário inválido'),
});

export type PaymentDTOType = z.infer<typeof PaymentDTO>;
