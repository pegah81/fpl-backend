import { ManagerService } from "../../service/manager.service";
import { body } from "express-validator";
import mongoose from "mongoose";
import { FileService } from "../../service/file.service";
const managerService = new ManagerService();
const fileService = new FileService();
import errors = require("../../helpers/error/path");
import { IFile } from "../../interface/file.interface";

export function handleUpdateProfile() {
  return [
    body("email")
      .trim()
      .optional()
      .isEmail()
      .withMessage("Email format is not correct")
      .bail()
      .custom(async (value: any, { req }) => {
        let manager = await managerService.getManagerByEmail(value);

        if (
          manager &&
          !manager._id.equals(new mongoose.Types.ObjectId(req._id))
        ) {
          return Promise.reject("email is already taken");
        }
      }),

    body("username")
      .trim()
      .optional()
      .custom(async (value, { req }) => {
        let manager = await managerService.getManagerByUsername(value);
        if (
          manager &&
          !manager._id.equals(new mongoose.Types.ObjectId(req._id))
        ) {
          return Promise.reject("username is already taken");
        }
      }),

    body("image")
      .trim()
      .optional()
      .isMongoId()
      .withMessage("mongoId is not valid")
      .bail()
      .custom(async (value, { req }) => {
        let result: IFile | errors.NotFoundError =
          await fileService.getFileById(value);
        if (result instanceof errors.BaseError) {
          return Promise.reject("Sent file doesn't exist");
        }
      }),
  ];
}
