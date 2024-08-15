import { Router } from "express";
import userTestRouter from "./UserTestRoutes";
import authRouter from "./AuthRoutes";

const router = Router();  

router.use('/userTest', userTestRouter);
router.use('/auth', authRouter);
router.route('/').get((_, res) => {
  res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});

export default router;