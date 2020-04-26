import { combineEpics } from "redux-observable";

import { gamesEpics } from "./games";

export const rootEpic = combineEpics(gamesEpics);
