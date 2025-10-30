import express from "express";
import { authMe } from "../../controllers/auth/userController.js";
import { test } from "../../controllers/auth/authController.js";

const router = express.Router();

router.get("/me", authMe);

router.get("/test", test);
export default router;
