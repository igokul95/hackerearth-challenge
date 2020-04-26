import { combineReducers } from "redux";
import { getType } from "typesafe-actions";

import { ACReduxActions, PSGame, APIStatus } from "../types";
import * as actions from "../actions";

export type GamesState = {
  data: PSGame[];
  apiStatus: APIStatus;
};

export default combineReducers<GamesState, ACReduxActions>({
  data: (state = [], action) => {
    switch (action.type) {
      case getType(actions.fetchGamesAction.success): {
        return action.payload;
      }
      default:
        return state;
    }
  },
  apiStatus: (state = APIStatus.uninitiated, action) => {
    switch (action.type) {
      case getType(actions.fetchGamesAction.request): {
        return APIStatus.progress;
      }
      case getType(actions.fetchGamesAction.success): {
        return APIStatus.success;
      }
      case getType(actions.fetchGamesAction.failure): {
        return APIStatus.failed;
      }
      default:
        return state;
    }
  },
});
