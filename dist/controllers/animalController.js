"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
const db_1 = __importDefault(require("../db"));
class AnimalController {
    async create(req, res, next) {
        try {
            const animalData = DTOs_1.Animal.parse(req.body);
            if (!animalData.ownerId) {
                return res.status(400).json({ message: 'OwnerId is required' });
            }
            const createdAnimal = await repositories_1.AnimalRepository.create({
                name: animalData.name,
                species: animalData.species,
                image: animalData.image,
                bio: animalData.bio,
                gender: animalData.gender,
                ownerId: animalData.ownerId,
                statusAdoption: animalData.statusAdoption,
            });
            return res.status(201).json({ message: 'Animal created', data: createdAnimal });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { animalId } = req.params;
            const animal = await repositories_1.AnimalRepository.findById(animalId);
            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            return res.status(200).json({ data: animal });
        }
        catch (error) {
            return next(error);
        }
    }
    async readAll(req, res, next) {
        try {
            const animals = await repositories_1.AnimalRepository.findAll();
            return res.status(200).json({ data: animals });
        }
        catch (error) {
            return next(error);
        }
    }
    async readByOwnerId(req, res, next) {
        try {
            const { ownerId } = req.params;
            if (!ownerId) {
                return res.status(400).json({ message: 'OwnerId is required' });
            }
            const animals = await repositories_1.AnimalRepository.findByOwnerId(ownerId);
            if (animals.length === 0) {
                return res.status(404).json({ message: 'No animals found for this owner' });
            }
            return res.status(200).json(animals);
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { animalId } = req.params;
            const animalData = DTOs_1.UpdateAnimal.parse(req.body);
            const animal = await repositories_1.AnimalRepository.update(animalId, animalData);
            return res.status(200).json({ message: 'Animal updated', data: animal });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { animalId } = req.params;
            if (!animalId) {
                return res.status(400).json({ message: 'Animal ID is required' });
            }
            await db_1.default.feed.deleteMany({
                where: { animalId: animalId },
            });
            const animal = await repositories_1.AnimalRepository.delete(animalId);
            return res.status(200).json({ message: 'Animal and associated feed deleted', data: animal });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new AnimalController();
