import { ActionType, StateType } from "typesafe-actions";

import * as actions from "../actions";
import { rootReducer } from "../reducers";

export type Store = StateType<typeof rootReducer>;

export type ACReduxActions = ActionType<typeof actions>;

export type RootState = StateType<typeof rootReducer>;
export type RootInputAction = ACReduxActions;
export type RootOutputAction = ACReduxActions;

export type PSGame = {
  'editors_choice': boolean;
  'genre': string;
  'platform': string;
  'release_year': number;
  'score': number;
  'title': string;
  'url': string;
};

export type PSGameResponse = {
    'editors_choice': string;
    'genre': string;
    'platform': string;
    'release_year': number;
    'score': number;
    'title': string;
    'url': string;
  };

export enum APIStatus {
    success = "success",
    failed = "failed",
    progress = "progress",
    uninitiated = "uninitiated"
  }
