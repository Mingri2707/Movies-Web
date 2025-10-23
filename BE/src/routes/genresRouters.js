import express from "express";
import {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genreControllers.js";
const router = express.Router();

router.get("/", getAllGenres);

router.post("/", createGenre);

router.put("/:id", updateGenre);

router.delete("/:id", deleteGenre);

export default router;
