import express from "express";
const routes = express.Router();
import { EventController } from "../controllers/eventController";
const eventController = new EventController();
import { updateEventdata } from "../database/resource/updateData";

routes.get("/current/info", eventController.getCurrentEvent);
// routes.get("/updateData", updateEventdata);

module.exports = routes;
