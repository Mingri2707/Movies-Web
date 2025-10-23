import Episode from "../models/Episode.js";
import * as crud from "./crudControllers.js";

export const createEpisode = crud.create(Episode);
export const getAllEpisodes = crud.getAll(Episode);
export const updateEpisode = crud.update(Episode);
export const deleteEpisode = crud.remove(Episode);
