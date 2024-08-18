import { Router } from "express";
import { CampaignController } from "../repositories";

const campaignRouter = Router();

campaignRouter.route("/").post(CampaignController.create);
campaignRouter.route("/").get(CampaignController.readAll);
campaignRouter.route("/:campaignId").get(CampaignController.read);
campaignRouter.route("/:campaignId").put(CampaignController.update);
campaignRouter.route("/:campaignId").delete(CampaignController.delete);

export default campaignRouter;
