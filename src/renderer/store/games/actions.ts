import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { PackageDetails } from '../../../models';
import { GameData, GamesMap } from './reducer';

export const fetchPackagesForGameAsync = createAsyncAction(
  'FETCH_GAME_PACKAGES_REQUEST',
  'FETCH_GAME_PACKAGES_SUCCESS',
  'FETCH_GAME_PACKAGES_FAILURE',
  'FETCH_GAME_PACKAGES_CANCEL'
)<string, PackageDetails[], Error, string>();

export const loadGamesAsync = createAsyncAction(
  'LOAD_GAMES_REQUEST',
  'LOAD_GAMES_SUCCESS',
  'LOAD_GAMES_FAILURE',
  'LOAD_GAMES_CANCEL'
)<void, GamesMap, Error, void>();

export const addGameData = createStandardAction('ADD_GAME_DATA')<GameData>();
export const removeGameData = createStandardAction('REMOVE_GAME_DATA')<string>();
