"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class AnimalRepository {
    async create(data) {
        const result = await db_1.default.$transaction(async (prisma) => {
            const feed = await prisma.feed.create({
                data: {},
            });
            const animal = await prisma.animal.create({
                data: {
                    name: data.name,
                    species: data.species,
                    image: data.image,
                    bio: data.bio,
                    gender: data.gender,
                    statusAdoption: data.statusAdoption,
                    owner: {
                        connect: { id: data.ownerId },
                    },
                    feed: {
                        connect: { id: feed.id },
                    },
                },
            });
            await prisma.feed.update({
                where: { id: feed.id },
                data: {
                    animalId: animal.id,
                },
            });
            return animal;
        });
        return result;
    }
    async findById(id) {
        const animal = await db_1.default.animal.findUnique({ where: { id },
            include: {
                owner: true,
                campaign: true
            }, });
        return animal;
    }
    async findByOwnerId(ownerId) {
        const animals = await db_1.default.animal.findMany({ where: { ownerId },
            include: {
                owner: true,
                campaign: true
            } });
        return animals;
    }
    async findAll() {
        const animals = await db_1.default.animal.findMany();
        return animals;
    }
    async update(id, data) {
        const animal = await db_1.default.animal.update({ where: { id }, data });
        return animal;
    }
    async delete(id) {
        const result = await db_1.default.$transaction(async (prisma) => {
            const animalExists = await prisma.animal.findUnique({
                where: { id }
            });
            if (!animalExists) {
                throw new Error('Animal já foi deletado ou não existe');
            }
            const animal = await prisma.animal.delete({
                where: { id },
            });
            await prisma.post.deleteMany({
                where: { feedId: id },
            });
            await prisma.feed.delete({
                where: { id: animalExists.id },
            });
            return animal;
        });
        return result;
    }
}
exports.default = new AnimalRepository();
