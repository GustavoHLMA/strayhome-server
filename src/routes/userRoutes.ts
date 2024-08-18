import { Router } from "express";
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route("/").post(UserController.create);
userRouter.route("/").get(UserController.readAll);
userRouter.route("/:userId").get(UserController.read);
userRouter.route("/:userId").put(UserController.update);
userRouter.route("/:userId").delete(UserController.delete);

export default userRouter;