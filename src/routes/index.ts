import { Router } from "express";

const router = Router();  

router.route('/').get((_, res) => {
  res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});

export default router;