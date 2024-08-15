import { Router } from "express";
import userTestRouter from "./UserTestRoutes";

const router = Router();  

router.use('/userTest', userTestRouter);
router.route('/').get((_, res) => {
  res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});

export default router;