import { IFile, IFileRepo } from "../../interface/file.interface";
import models = require("../../models/path");
import { objId } from "../../types/types";

export class FileRepo implements IFileRepo {
  public createFile = async (file: IFile): Promise<IFile> => {
    let finalFile: IFile = await models.fileModel.create(file);
    return finalFile;
  };

  public getFileById = async (fileId: objId): Promise<IFile> => {
    const file: IFile = await models.fileModel.findById(fileId);
    return file;
  };
}
