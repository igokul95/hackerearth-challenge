import { createAction, createAsyncAction } from 'typesafe-actions';  
import * as constants from '../constants'

import { PSGame } from '../types';

export const sampleAction = createAction(
    constants.SAMPLE_ACTION,
)<void>();

export const sampleAsyncAction = createAsyncAction(
    constants.SAMPLE_ACTION_REQUEST,
    constants.SAMPLE_ACTION_SUCCESS,
    constants.SAMPLE_ACTION_FAILURE
)<void, void, void>();

export const fetchGamesAction = createAsyncAction(
    constants.FETCH_GAMES_REQUEST,
    constants.FETCH_GAMES_SUCCESS,
    constants.FETCH_GAMES_FAILURE
)<void, PSGame[], void>();

