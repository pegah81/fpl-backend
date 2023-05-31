import models = require("../../models/path");
import { IPick, ITeam } from "../../interface/team.interface";
import { IManagerRepo, IManager } from "../../interface/manager.interface";
import { managerSignUpType, objId } from "../../types/types";
import { managerUpdateType } from "../../types/manager.type";
import { updateMongoResponseType } from "../../types/mongo.type";
import errors = require("../../helpers/error/path");

export class ManagerRepo implements IManagerRepo {
  getManagersByName(name: string): Promise<IManager[] | null> {
    const managers = models.managerModel.find({
      $expr: {
        $regexMatch: {
          input: {
            $concat: ["$first_name", " ", "$last_name", "$username"],
          },
          regex: name,
          options: "i",
        },
      },
    });
    return managers;
  }

  getManagerByEmail(email: string): Promise<IManager> {
    const manager = models.managerModel.findOne({ email });
    return manager;
  }

  async getManagers(): Promise<IManager[]> {
    return await models.managerModel.find();
  }

  getManagerById = async (
    managerId: objId,
    populate?: any,
    select?: any
  ): Promise<IManager> => {
    const manager = await models.managerModel
      .findById(managerId, select)
      .populate(populate);

    return manager;
  };

  //where is this used?
  getTeamByManagerId = async (managerId: objId): Promise<Array<IPick>> => {
    const manager = await models.managerModel
      .findById(managerId)
      .populate("teamId")
      .exec();
    return manager.teamId.picks;
  };

  //where is this used?
  getTeamDetailByManagerId = async (managerId: objId): Promise<object> => {
    const team = await models.managerModel
      .findById(managerId)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }])
      .exec();
    return team;
  };

  updateManagerBudgetById = async (
    managerId: objId,
    budget: number
  ): Promise<void> => {
    await models.managerModel.updateOne(
      { _id: managerId },
      { $set: { budget: budget } }
    );
  };

  createManager = async (managerData: managerSignUpType): Promise<IManager> => {
    const manager: IManager = await models.managerModel.create(managerData);
    return manager;
  };

  findManager = async (username: string): Promise<IManager> => {
    const manager: IManager = await models.managerModel.findOne({
      username: username,
    });
    return manager;
  };

  createTeam = async (): Promise<objId> => {
    let picks = [];
    for (let i = 0; i < 15; i++) {
      await picks.push({
        player_id: null,
        index: i,
      });
    }
    const team = await models.teamModel.create({
      picks: picks,
    });
    return team._id;
  };

  updateManager = async (
    managerId: objId,
    newManager: managerUpdateType
  ): Promise<boolean> => {
    let response: updateMongoResponseType = await models.managerModel.updateOne(
      { _id: managerId },
      newManager
    );
    if (response.matchedCount == 0) {
      return false;
    }
    return true;
  };
}
