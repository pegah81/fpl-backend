import { Request, Response } from "express";
import errors = require("../helpers/error/path");
import { objId } from "../types/types";

export interface IFile {
  name: string;
  url: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
}

export interface IFileController {
  fileService: IFileService;
  createFile(req: Request, res: Response): Promise<Response>;
}

export interface IFileService {
  fileRepo: IFileRepo;
  createFile(
    file: Express.Multer.File
  ): Promise<IFile | errors.InternalServerError>;
  getFileById(fileId: objId): Promise<IFile | errors.NotFoundError>;
}

export interface IFileRepo {
  createFile(file: IFile): Promise<IFile>;
  getFileById(fileId: objId): Promise<IFile>;
}
