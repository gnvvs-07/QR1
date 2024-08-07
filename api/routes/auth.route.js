import express from "express";
import { signup } from "../controllers/auth.controller.js";
// router 
const router = express.Router()
// route and controller
router.post("/signup",signup);
export default router;