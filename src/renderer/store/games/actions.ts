import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { GameData, GamesMap } from './reducer';

export const loadGamesAsync = createAsyncAction(
  'LOAD_GAMES_REQUEST',
  'LOAD_GAMES_SUCCESS',
  'LOAD_GAMES_FAILURE',
  'LOAD_GAMES_CANCEL'
)<void, GamesMap, Error, void>();

export const addGameData = createStandardAction('ADD_GAME_DATA')<GameData>();
export const removeGameData = createStandardAction('REMOVE_GAME_DATA')<string>();
