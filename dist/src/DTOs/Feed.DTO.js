"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFeed = exports.Feed = void 0;
const zod_1 = require("zod");
exports.Feed = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    animalId: zod_1.z.string().uuid().nullable(),
    campaignId: zod_1.z.string().uuid().nullable(),
});
exports.UpdateFeed = exports.Feed.partial();
