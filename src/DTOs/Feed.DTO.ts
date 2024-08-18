import { z } from 'zod';

export const Feed = z.object({
    animalId: z.string().uuid().nullable(),
    campaignId: z.string().uuid().nullable(),
});

export const UpdateFeed = Feed.partial();