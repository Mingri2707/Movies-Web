import Genre from "../models/Genre.js";
import * as crud from "./crudControllers.js";

export const createGenre = crud.create(Genre);
export const getAllGenres = crud.getAll(Genre);
export const updateGenre = crud.update(Genre);
export const deleteGenre = crud.remove(Genre);
