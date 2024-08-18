import { Router } from "express";
import { AnimalController } from '../controllers';

const animalRouter = Router();

animalRouter.route("/").post(AnimalController.create);
animalRouter.route("/").get(AnimalController.readAll);
animalRouter.route("/owner/:ownerId").get(AnimalController.readByOwnerId)
animalRouter.route("/:animalId").get(AnimalController.read);
animalRouter.route("/:animalId").put(AnimalController.update);
animalRouter.route("/:animalId").delete(AnimalController.delete);

export default animalRouter;