import { Request, Response } from "express";
import { authResponseData, signInputData } from "../types/types";
import errors = require("../helpers/error/path");

interface IauthController {
  signUpManager(req: Request, res: Response): Promise<Response>;
  verify(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
}

interface IauthService {
  signUpManager(input: signInputData): Promise<boolean>;
  verify(
    email: string,
    code: string
  ): Promise<authResponseData | errors.AccessForbiddenError>;
  login(
    username: string,
    password: string
  ): Promise<
    authResponseData | errors.NotFoundError | errors.AccessForbiddenError
  >;
}

export { IauthController, IauthService };
