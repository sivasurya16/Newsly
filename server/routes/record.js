import express from "express";
import auth from "../Middleware/auth.js";
import recordController from "../controller/recordController.js";


const router = express.Router();

router.get("/",recordController.getAllNews);
router.get("/:id", recordController.getNewsById);
router.post("/", auth,recordController.createNews);
router.patch("/:id" ,auth,recordController.editNews);
router.delete("/:id",auth ,recordController.deleteNews);

export default router;