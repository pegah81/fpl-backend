import express = require("express");
const router = express.Router();
import { FileController } from "../controllers/fileController";
import { upload } from "../helpers/middleware/upload";
import { handleGetFile } from "../helpers/validation/fileValidation";
const fileController = new FileController();

router.post("/single", upload.single("file"), fileController.createFile);
router.get("/:id", handleGetFile(), fileController.getFile);

module.exports = router;
