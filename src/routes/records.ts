import { Router } from "express";
import * as recordController from "../controllers/records.controller";

const recordRouter = Router();

recordRouter.post("/", recordController.createRecord);

export default recordRouter;
