import { Epic, combineEpics } from "redux-observable";
import { of } from "rxjs";

import {
  catchError,
  filter,
  mergeMap,
  switchMap,
  throttleTime
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { sampleAsyncAction, fetchGamesAction } from "../actions";

import { Dependencies } from "../api/APIs";
import { RootInputAction, RootOutputAction, RootState, PSGame } from "../types";
import { cleanGameResponse } from '../utils'

export const getGamesEpic: Epic<
  RootInputAction,
  RootOutputAction,
  RootState,
  Dependencies
> = (action$, store$, { apis }) => {
  return action$.pipe(
    filter(isActionOf(fetchGamesAction.request)),
    switchMap(action => {
      return apis.getGames().pipe(
        throttleTime(1000),
        mergeMap(response => {
          console.log("inside getGames epic" ,response);
          const games: PSGame[] = cleanGameResponse(response.response)
          return of(fetchGamesAction.success(games));
        }),
        catchError(error => {
          console.log("error", error);
          return of(fetchGamesAction.failure());
        })
      );
    })
  );
};

export const gamesEpics = combineEpics(getGamesEpic);
