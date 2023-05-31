import { param } from "express-validator";

export function handleGetFile() {
  return [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("please send id in params")
      .isMongoId()
      .withMessage("sent id is not a mongoId"),
  ];
}
