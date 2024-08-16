import { Router } from "express";
import userTestRouter from "./UserTestRoutes";
import userRouter from "./userRoutes";
import animalRouter from "./animalRoutes";

const router = Router();  

router.use('/userTest', userTestRouter,);
router.use('/user', userRouter,)
router.use('/animal', animalRouter)
router.route('/').get((_, res) => {
  res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});

export default router;