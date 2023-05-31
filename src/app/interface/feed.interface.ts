import { Request, Response } from "express";
import { feedDisplay, objId, substitution, substitutionRsponse } from "../types/types";

export interface IFeedRepo {
  createFeed(managerId: objId): Promise<void>;
  convertSubs(subs:substitution[]):Promise<substitutionRsponse[]|null>;
  addSub(managerId: objId, sub: substitution, event:objId): Promise<void>;
};

export interface IFeedController {
    displayFeeds(req:Request,res:Response):Promise<Response>;
    like(req:Request,res:Response):Promise<Response>;
    disklike(req:Request,res:Response):Promise<Response>;
};

export interface IFeedService {
    displayFeeds(managerId:objId):Promise<Array<feedDisplay>>;
    like(managerId:objId,feedId:objId):Promise<boolean>;
    dislike(managerId:objId,feedId:objId):Promise<boolean>;
};

export interface IFeed {
    _id:objId,
    managerId?: objId;
    points: number;
    substitutions?: Array<substitution> | null;
    event?: objId;
}
