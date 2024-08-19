import { Router } from "express";
import userTestRouter from "./UserTestRoutes";
import userRouter from "./userRoutes";
import animalRouter from "./animalRoutes";
import feedRouter from "./feedRoutes";
import authRouter from "./AuthRoutes";
import postRouter from "./postRoutes";
import commentRouter from "./commentRoutes";
import campaignRouter from "./campaignRoutes"; 


const router = Router();  

router.use('/userTest', userTestRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter,)
router.use('/animal', animalRouter)
router.use('/feed', feedRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)
router.use('/user', userRouter);
router.use('/animal', animalRouter);
router.use('/feed', feedRouter);
router.use('/campaign', campaignRouter);  

router.route('/').get((_, res) => {
  res.status(200).send('The server is running');
});

export default router;
