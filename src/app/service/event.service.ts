import { EventRepo } from "../database/repository/event.repo";
import { IEventService, IEvent } from "../interface/event.interface";
import errors = require("../helpers/error/path");

export class EventService implements IEventService {
  eventRepo;

  constructor() {
    this.eventRepo = new EventRepo();
  }

  public getCurrentEvent = async (): Promise<IEvent | errors.NotFoundError> => {
    const currentEvent: IEvent | null = await this.eventRepo.getCurrentEvent();
    if (!currentEvent)
      return new errors.NotFoundError("Error while getting current event");
    return currentEvent;
  };
}
