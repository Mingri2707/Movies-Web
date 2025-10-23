import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/moviesControllers.js";

const router = express.Router();

router.get("/", getAllMovies);

router.post(
  "/",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createMovie
);

router.put(
  "/:id",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateMovie
);

router.delete("/:id", deleteMovie);

export default router;
