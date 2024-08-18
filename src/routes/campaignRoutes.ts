import { Router } from "express";
import { campaignController } from "../repositories";

const campaignRouter = Router();

campaignRouter.route("/").post(campaignController.create);
campaignRouter.route("/").get(campaignController.readAll);
campaignRouter.route("/:id").get(campaignController.read);
campaignRouter.route("/:id").put(campaignController.update);
campaignRouter.route("/:id").delete(campaignController.delete);

export default campaignRouter;
