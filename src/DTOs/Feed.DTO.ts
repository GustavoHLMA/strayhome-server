import { z } from 'zod';

export const Feed = z.object({
    id: z.string().uuid().optional(),
    animalId: z.string().uuid().nullable(),
    campaignId: z.string().uuid().nullable(),
});

export const UpdateFeed = Feed.partial();