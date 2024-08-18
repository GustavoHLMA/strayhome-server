import { Router } from "express";
import { PostController } from '../controllers';

const postRouter = Router();

postRouter.route("/").post(PostController.create);
postRouter.route("/").get(PostController.readAll);
postRouter.route("/feed/:feedId").get(PostController.readByFeedId)
postRouter.route("/:postId").get(PostController.read);
postRouter.route("/:postId").put(PostController.update);
postRouter.route("/:postId").delete(PostController.delete);

export default postRouter;