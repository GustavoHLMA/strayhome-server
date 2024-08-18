import { Router } from "express";
import { FeedController } from '../controllers';

const feedRouter = Router();

feedRouter.route("/").get(FeedController.readAll);
feedRouter.route("/:feedId").get(FeedController.read);
feedRouter.route("/:feedId").put(FeedController.update);
feedRouter.route("/:feedId").delete(FeedController.delete);

export default feedRouter;