import { Router } from "express";
import { feedController } from '../controllers';

const feedRouter = Router();

feedRouter.route("/").get(feedController.readAll);
feedRouter.route("/:feedId").get(feedController.read);
feedRouter.route("/:feedId").put(feedController.update);
feedRouter.route("/:feedId").delete(feedController.delete);

export default feedRouter;