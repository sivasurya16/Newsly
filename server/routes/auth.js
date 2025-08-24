import express from "express";
import auth from "../Middleware/auth.js"
import authController from "../controller/authController.js"

const router = express.Router();


router.post('/register',authController.register);
router.post('/login', authController.login);

router.get('/user/info',auth, authController.getUserInfo);

export default router;