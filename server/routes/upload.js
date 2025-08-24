import express from "express";
import auth from "../Middleware/auth.js"
import uploadFile from "../controller/uploadFileController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); // store in memory buffer
const router = express.Router();

router.post("/", auth, upload.single("file"), uploadFile)

export default router;