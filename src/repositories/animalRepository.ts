import { Prisma, Animal } from '@prisma/client';
import prisma from '../db';

class AnimalRepository {
    async create(data: { name: string; species: string; image: string; bio: string; gender: string; ownerId: string; }): Promise<Animal> {
        const result = await prisma.$transaction(async (prisma) => {
            
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
    async findById(id: string): Promise<Animal | null> {
        const animal = await prisma.animal.findUnique({ where: { id }, 
            include: {
                owner: true,
                campaign: true

            }, });
        return animal;
    }

    async findByOwnerId(ownerId: string): Promise<Animal[]> {
        const animals = await prisma.animal.findMany({ where: { ownerId },
            include: {
                owner:true,
                campaign: true
            }});
        return animals;
    }

    async findAll(): Promise<Animal[]> {
        const animals = await prisma.animal.findMany();
        return animals;
    }

    async update (id: string, data: Prisma.AnimalUpdateInput): Promise<Animal> {
        const animal = await prisma.animal.update({where: {id}, data})
        return animal;
    }

    async delete (id: string): Promise <Animal> {

        const result = await prisma.$transaction(async (prisma) => {

            const animalExists = await prisma.animal.findUnique({
                where: { id }
            })

            if (!animalExists) {
                throw new Error('Animal já foi deletado ou não existe')
            }

            const animal = await prisma.animal.delete({
                where: { id },
            });
            
            
            await prisma.feed.delete({
                where: { id: animalExists.id },
            });

            return animal;
        });
    
        return result;
    }


}

export default new AnimalRepository();