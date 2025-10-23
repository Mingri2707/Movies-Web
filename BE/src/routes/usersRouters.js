import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
const router = express.Router();

router.get("/", getAllUsers);

router.post(
  "/",
  upload.fields([{ name: "avatar_url", maxCount: 1 }]),
  createUser
);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
