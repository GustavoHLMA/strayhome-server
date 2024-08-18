import { Router } from "express";
import { CommentController } from '../controllers';

const commentRouter = Router();

commentRouter.route("/").post(CommentController.create);
commentRouter.route("/").get(CommentController.readAll);
commentRouter.route("/post/:postId").get(CommentController.readByPostId)
commentRouter.route("/:commentId").get(CommentController.read);
commentRouter.route("/:commentId").put(CommentController.update);
commentRouter.route("/:commentId").delete(CommentController.delete);

export default commentRouter;