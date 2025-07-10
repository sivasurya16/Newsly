import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import db from "../db/connection.js";
import auth from "../Middleware/auth.js"
import authController from "../controller/authController.js"

import { ObjectId } from "mongodb";
const router = express.Router();


router.post('/register',authController.register);
router.post('/login', authController.login);

router.get('/user/info',auth, authController.getUserInfo);

export default router;