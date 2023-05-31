import express from "express";
import { ManagerController } from "../controllers/managerController";
import { authToken } from "../helpers/middleware/authentication";
import { handleUpdateProfile } from "../helpers/validation/managerValidation";
const router = express.Router();
const managerController = new ManagerController();

router.get("/dashboard", authToken, managerController.getDashboard);
router.get("/profile", authToken, managerController.getProfile);
router.patch(
  "/update",
  authToken,
  handleUpdateProfile(),
  managerController.updateProfile
);

module.exports = router;
