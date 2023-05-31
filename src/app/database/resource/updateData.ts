import models = require("../../models/path");
import { Request, Response } from "express";
const axios = require("axios");

const updatePlayerPositionsData = async (req: Request, res: Response) => {
  const response = await axios.get(process.env.FPL_URL);

  for (let position of response.data.element_types) {
    let update = await models.positionModel.update(
      { generalId: position.id },
      {
        plural_name: position.plural_name,
        plural_name_short: position.plural_name_short,
        singular_name: position.singular_name,
        singular_name_short: position.singular_name_short,
        squad_count: position.squad_select,
        squad_min_play: position.squad_min_play,
        squad_max_play: position.squad_max_play,
        ui_shirt_specific: position.ui_shirt_specific,
        sub_positions_locked: position.sub_positions_locked,
        element_count: position.element_count,
      }
    );

    if (update.matchedCount == 0) {
      await models.positionModel.create({
        generalId: position.id,
        plural_name: position.plural_name,
        plural_name_short: position.plural_name_short,
        singular_name: position.singular_name,
        singular_name_short: position.singular_name_short,
        squad_count: position.squad_select,
        squad_min_play: position.squad_min_play,
        squad_max_play: position.squad_max_play,
        ui_shirt_specific: position.ui_shirt_specific,
        sub_positions_locked: position.sub_positions_locked,
        element_count: position.element_count,
      });
    }
  }
  let positions = await models.positionModel.find();
  return res.status(200).json({ data: positions });
};

const updatePlayerdata = async (req: Request, res: Response) => {
  const response = await axios.get(process.env.FPL_URL);

  for (let player of response.data.elements) {
    let update = await models.playerModel.update(
      { generalId: player.id },
      {
        positionId: player.element_type,
        event_points: player.event_points,
        first_name: player.first_name,
        second_name: player.second_name,
        web_name: player.web_name,
        now_cost: player.now_cost / 10,
        teamId: player.team,
        value_season: player.value_season,
        form: player.value_form,
        minutes: player.minutes,
        goals_scored: player.goals_scored,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
      }
    );

    if (update.matchedCount == 0) {
      await models.playerModel.create({
        generalId: player.id,
        positionId: player.element_type,
        event_points: player.event_points,
        first_name: player.first_name,
        second_name: player.second_name,
        web_name: player.web_name,
        now_cost: player.now_cost / 10,
        teamId: player.team,
        value_season: player.value_season,
        form: player.value_form,
        minutes: player.minutes,
        goals_scored: player.goals_scored,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
      });
    }
  }

  let players = await models.playerModel.find();
  return res.status(200).json({ data: players });
};

const updateEventdata = async (req: Request, res: Response) => {
  const response = await axios.get(process.env.FPL_URL);

  for (let event of response.data.events) {
    let update = await models.eventModel.update(
      { generalId: event.id },
      {
        name: event.name,
        deadline_time: event.deadline_time,
        average_entry_score: event.average_entry_score,
        finished: event.finished,
        data_checked: event.data_checked,
        highest_scoring_entry: event.highest_scoring_entry,
        deadline_time_epoch: event.deadline_time_epoch,
        highest_score: event.highest_score,
        is_current: event.is_current,
      }
    );

    if (update.matchedCount == 0) {
      await models.eventModel.create({
        generalId: event.id,
        name: event.name,
        deadline_time: event.deadline_time,
        average_entry_score: event.average_entry_score,
        finished: event.finished,
        data_checked: event.data_checked,
        highest_scoring_entry: event.highest_scoring_entry,
        deadline_time_epoch: event.deadline_time_epoch,
        highest_score: event.highest_score,
        is_current: event.is_current,
      });
    }
  }
  let events = await models.eventModel.find();
  res.status(200).json({ data: events });
};

export { updatePlayerdata, updatePlayerPositionsData, updateEventdata };
