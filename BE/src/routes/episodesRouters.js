import express from "express";
import {
  getAllEpisodes,
  createEpisode,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episodeControllers.js";
const router = express.Router();

router.get("/", getAllEpisodes);

router.post("/", createEpisode);

router.put("/:id", updateEpisode);

router.delete("/:id", deleteEpisode);

export default router;
