import { Request, Response } from "express";
import mongoose from "mongoose";
import errors = require("../helpers/error/path");
import {
  IFile,
  IFileController,
  IFileService,
} from "../interface/file.interface";
import { ApiGeneralService } from "../service/api.general.service";
import { FileService } from "../service/file.service";
import utils = require("../helpers/utils/utils");

export class FileController
  extends ApiGeneralService
  implements IFileController
{
  fileService: IFileService;
  constructor() {
    super();
    this.fileService = new FileService();
  }

  public createFile = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      if (!req.file) {
        throw new errors.BadRequestError("no file was sent");
      }
      let result: IFile | errors.InternalServerError =
        await this.fileService.createFile(req.file);
      if (result instanceof errors.InternalServerError) {
        throw result;
      }
      return await this.createSuccessfulResponse(
        res,
        "file successfully created",
        { file: result }
      );
    } catch (err: any) {
      if (err instanceof errors.BaseError) {
        return this.sendFailedResponse(res, err);
      }
      return this.sendFailedResponse(
        res,
        new errors.InternalServerError("error in creating file")
      );
    }
  };

  public getFile = async (req: Request, res: Response): Promise<Response> => {
    try {
      await utils.validationErrorHandler(req);
      const result: IFile | errors.NotFoundError =
        await this.fileService.getFileById(
          new mongoose.Types.ObjectId(req.params.id)
        );
      if (result instanceof errors.BaseError) {
        throw result;
      }
      return await this.createSuccessfulResponse(
        res,
        "file successfully sent",
        { file: result }
      );
    } catch (err: any) {
      if (err instanceof errors.BaseError) {
        return this.sendFailedResponse(res, err);
      }
      return this.sendFailedResponse(
        res,
        new errors.InternalServerError("error in sending file")
      );
    }
  };
}
