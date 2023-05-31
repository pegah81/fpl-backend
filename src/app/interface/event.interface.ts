import { Request, Response } from "express";
import { objId } from "../types/types";
import errors = require("../helpers/error/path");

export interface IEvent {
  _id: objId;
  generalId: string;
  name: String;
  deadline_time: String;
  average_entry_score: String;
  finished: Boolean;
  data_checked: Boolean;
  highest_scoring_entry: Number;
  deadline_time_epoch: String;
  highest_score: Number;
  is_current: Boolean;
}

export interface IEventRepo {
  getCurrentEvent(): Promise<IEvent | null>;
}

export interface IEventService {
  eventRepo: IEventRepo;
  getCurrentEvent(): Promise<IEvent | errors.NotFoundError>;
}

export interface IEventController {
  eventService: IEventService;
  getCurrentEvent(req: Request, res: Response): Promise<Response>;
}
