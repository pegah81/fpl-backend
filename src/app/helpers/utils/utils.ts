import { validationResult } from "express-validator";
import { IPlayer } from "../../interface/player.interface";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../../types/response.type";
import { ValidationError } from "../error/validationError";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { objId } from "../../types/types";

export const paginationResponseToFront = async (
  response: paginateResponseType
): Promise<paginateResponseToFrontType> => {
  let newResponse: paginateResponseToFrontType = {
    array: response.docs as IPlayer[],
    total: response.total,
    limit: response.limit,
    page: response.page,
    pages: response.pages,
  };
  return newResponse;
};

export const validationErrorHandler = async (req: Request, status = 400) => {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(
      validationResult(req).array(),
      "validation error",
      status
    );
  }
};

export const mailSender = async (
  receiver: string,
  subject: string,
  text: string
): Promise<boolean> => {
  let flag = 0;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    auth: {
      user: "info.rcteam2@gmail.com",
      pass: "xpfjwyxlihigjpgh",
    },
  });
  let mailOptions = {
    from: "info.rcteam2@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: string }): void {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        flag = 1;
      }
    }
  );
  if (flag === 1) {
    return false;
  }
  return true;
};

export const confirmationCodeGenerator = async (): Promise<Number> => {
  const val: Number = await Math.floor(1000 + Math.random() * 9000);
  return val;
};

export const removeSpaces = async (text: string): Promise<string> => {
  return await text.replace(/\s/g, "");
};

export const getFilename = async (
  file: Express.Multer.File
): Promise<string> => {
  let originalName = file.originalname.split(".")[0];
  let filename: string =
    originalName + "-" + Date.now() + path.extname(file.originalname);
  filename = await removeSpaces(filename);
  return filename;
};

export const urlFormatter = async (url: string): Promise<string> => {
  return `${process.env.BASE_URL}${url
    .replace(/\\/g, "/")
    .replace(/[\s]/g, "-")}`;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const bcryptCompare = async (
  password1: string,
  password2: string
): Promise<boolean> => {
  const isValid: boolean = await bcrypt.compare(password1, password2);
  return isValid;
};

export const getToken = async (managerId: objId): Promise<string> => {
  const token: string = jwt.sign({ id: managerId }, process.env.HASH_KEY!);
  return token;
};
