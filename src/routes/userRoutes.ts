import { Router } from "express";
import { userController } from '../controllers';

const userRouter = Router();

userRouter.route("/").post(userController.create);
userRouter.route("/").get(userController.readAll);
userRouter.route("/:userId").get(userController.read);
userRouter.route("/:userId").put(userController.update);
userRouter.route("/:userId").delete(userController.delete);

export default userRouter;