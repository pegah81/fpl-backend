import { Request, Response } from "express";
import { EventService } from "../service/event.service";
import { ApiGeneralService } from "../service/api.general.service";
import {
  IEvent,
  IEventController,
  IEventService,
} from "../interface/event.interface";
import errors = require("../helpers/error/path");

export class EventController
  extends ApiGeneralService
  implements IEventController
{
  eventService: IEventService;
  constructor() {
    super();
    this.eventService = new EventService();
  }

  public getCurrentEvent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const event: IEvent | errors.AccessForbiddenError =
        await this.eventService.getCurrentEvent();
      return await this.generalSuccessfulResponse(
        res,
        "Event sent successfuly",
        event
      );
    } catch (err: any) {
      if (err instanceof errors.BaseError) {
        return await this.sendFailedResponse(res, err);
      }
      return await this.sendFailedResponse(
        res,
        new errors.InternalServerError("error in getting event")
      );
    }
  };
}
