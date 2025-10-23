import WatchLog from "../models/WatchLog.js";
import * as crud from "./crudControllers.js";

export const createWatchLog = crud.create(WatchLog);
export const getAllWatchLogs = crud.getAll(WatchLog);
export const updateWatchLog = crud.update(WatchLog);
export const deleteWatchLog = crud.remove(WatchLog);
