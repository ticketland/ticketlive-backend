import CreateEntranceController from "@modules/entrances/useCases/createEntrance/CreateEntranceController";
import FindEntranceController from "@modules/entrances/useCases/findEntrance/FindEntranceController";
import { Router } from "express";

const entranceRouter = Router();
const createEntranceController = new CreateEntranceController();
const findEntranceController = new FindEntranceController();

entranceRouter.post("/", createEntranceController.handle);
entranceRouter.get("/:entrance_id", findEntranceController.handle);

export default entranceRouter;
