import Comment from "../models/Comment.js";
import * as crud from "./crudControllers.js";

export const getAllComments = crud.getAll(Comment);
export const createComment = crud.create(Comment);
export const updateComment = crud.update(Comment);
export const deleteComment = crud.remove(Comment);
