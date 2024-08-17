import { Router } from "express";
import { animalController } from '../controllers';

const animalRouter = Router();

animalRouter.route("/").post(animalController.create);
animalRouter.route("/").get(animalController.readAll);
animalRouter.route("/owner/:ownerId").get(animalController.readByOwnerId)
animalRouter.route("/:animalId").get(animalController.read);
animalRouter.route("/:animalId").put(animalController.update);
animalRouter.route("/:animalId").delete(animalController.delete);

export default animalRouter;