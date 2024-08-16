import { Request, Response, NextFunction } from 'express';
import { AnimalRepository } from '../repositories';
import { Animal, UpdateAnimal } from '../DTOs';

class AnimalController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const animalData = Animal.parse(req.body);

            if (!animalData.ownerId) {
                return res.status(400).json({ message: 'OwnerId is required' });
            }

            const createdAnimal = await AnimalRepository.create({
                name: animalData.name,
                species: animalData.species,
                image: animalData.image,
                bio: animalData.bio,
                gender: animalData.gender,
                ownerId: animalData.ownerId,
            });

            return res.status(201).json({ message: 'Animal created', data: createdAnimal });
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
          const { animalId } = req.params;
    
          const animal = await AnimalRepository.findById(animalId);
    
          if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
          }
    
          return res.status(200).json({ data: animal });
        } catch (error) {
          return next(error);
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
          const animals = await AnimalRepository.findAll();
    
          return res.status(200).json({ data: animals });
        } catch (error) {
          return next(error);
        }
    }

    async readByOwnerId(req: Request, res: Response, next: NextFunction) {
        try {
            const { ownerId } = req.params;

            if (!ownerId) {
                return res.status(400).json({ message: 'OwnerId is required' });
            }

            const animals = await AnimalRepository.findByOwnerId(ownerId);

            if (animals.length === 0) {
                return res.status(404).json({ message: 'No animals found for this owner' });
            }

            return res.status(200).json(animals);
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
          const { animalId } = req.params;
          const animalData = UpdateAnimal.parse(req.body);
    
          const animal = await AnimalRepository.update(animalId, animalData);
    
          return res.status(200).json({ message: 'Animal updated', data: animal });
        } catch (error) {
          return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
          const { animalId } = req.params;
    
          await AnimalRepository.delete(animalId);
    
          return res.status(200).json({ message: 'Animal deleted' });
        } catch (error) {
          return next(error);
        }
    }

}

export default new AnimalController();