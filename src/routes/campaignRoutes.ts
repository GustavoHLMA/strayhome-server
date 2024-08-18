import { Router } from "express";
import { CampaignController } from "../repositories";

const campaignRouter = Router();

campaignRouter.route("/").post(CampaignController.create);
campaignRouter.route("/").get(CampaignController.readAll);
campaignRouter.route("/:id").get(CampaignController.read);
campaignRouter.route("/:id").put(CampaignController.update);
campaignRouter.route("/:id").delete(CampaignController.delete);

export default campaignRouter;
