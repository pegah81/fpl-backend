import utils = require("../helpers/utils/utils");
import { IFile, IFileRepo, IFileService } from "../interface/file.interface";
import { FileRepo } from "../database/repository/file.repo";
import errors = require("../helpers/error/path");
import { objId } from "../types/types";

export class FileService implements IFileService {
  fileRepo: IFileRepo;
  constructor() {
    this.fileRepo = new FileRepo();
  }

  public createFile = async (
    file: Express.Multer.File
  ): Promise<IFile | errors.InternalServerError> => {
    let finalFile: IFile = {
      name: file!.filename,
      url: await utils.urlFormatter(file!.path),
      mimetype: file!.mimetype,
      size: file!.size,
      destination: file!.destination,
      path: file!.path,
    };
    finalFile = await this.fileRepo.createFile(finalFile);
    if (!finalFile) {
      return new errors.InternalServerError("Error while creating file");
    }
    return finalFile;
  };

  public getFileById = async (
    fileId: objId
  ): Promise<IFile | errors.NotFoundError> => {
    const file = await this.fileRepo.getFileById(fileId);
    if (!file) return new errors.NotFoundError("File not found");
    return file;
  };
}
