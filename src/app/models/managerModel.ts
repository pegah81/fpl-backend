import { model, Schema, Types } from "mongoose";
import { IManager } from "../interface/manager.interface";
import utils = require("../helpers/utils/utils");

const managerSchema = new Schema<IManager>(
  {
    first_name: {
      type: String,
      default: null,
      required: true,
      maxlength: 20,
    },
    last_name: {
      type: String,
      required: true,
      default: null,
      maxlength: 20,
    },
    username: {
      type: String,
      default: null,
      unique: false,
      required: true,
    },
    country: {
      type: String,
      default: null,
      required: true,
    },
    password: {
      type: String,
      default: null,
      required: true,
    },
    email: {
      type: String,
      default: null,
      unique: false,
      required: true,
    },
    budget: {
      type: Number,
      default: 100,
    },
    teamId: {
      type: Types.ObjectId,
      ref: "Team",
    },
    age: {
      type: Number,
      default: null,
    },
    points: {
      type: Number,
      default: 0,
    },
    image: {
      type: Types.ObjectId,
      default: null,
      ref: "File",
    },
  },
  { versionKey: false }
);

managerSchema.pre("save", async function (next: any) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await utils.hashPassword(this.password.toString());
    return next();
  } catch (error) {
    return next(error);
  }
});

const Manager = model<IManager>("Manager", managerSchema);

module.exports = Manager;
