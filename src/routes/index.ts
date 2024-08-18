import { Router } from "express";
import userTestRouter from "./UserTestRoutes";
import userRouter from "./userRoutes";
import animalRouter from "./animalRoutes";
import feedRouter from "./feedRoutes";
import authRouter from "./AuthRoutes";
import postRouter from "./postRoutes";
import commentRouter from "./commentRoutes";

const router = Router();  

router.use('/userTest', userTestRouter,);
router.use('/auth', authRouter);
router.use('/user', userRouter,)
router.use('/animal', animalRouter)
router.use('/feed', feedRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)
router.route('/').get((_, res) => {
  res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});

export default router;