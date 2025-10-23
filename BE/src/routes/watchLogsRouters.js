import express from "express";
import {
  getAllWatchLogs,
  createWatchLog,
  updateWatchLog,
  deleteWatchLog,
} from "../controllers/watchLogControllers.js";
const router = express.Router();

router.get("/", getAllWatchLogs);

router.post("/", createWatchLog);

router.put("/:id", updateWatchLog);

router.delete("/:id", deleteWatchLog);

export default router;
