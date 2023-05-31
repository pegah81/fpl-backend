import models = require("../../models/path");
import { IEventRepo, IEvent } from "../../interface/event.interface";

export class EventRepo implements IEventRepo {
  public getCurrentEvent = async (): Promise<IEvent | null> => {
    let event: IEvent = await models.eventModel.findOne({ is_current: true });
    if (!event) return null;
    return event;
  };
}
