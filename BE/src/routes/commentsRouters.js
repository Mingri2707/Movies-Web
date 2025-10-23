import express from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentControllers.js";
const router = express.Router();

router.get("/", getAllComments);

router.post("/", createComment);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;
