import { createReducer, PayloadAction } from 'typesafe-actions';
import { PackageDetails } from '../../../models';
import { loadGamesAsync, fetchPackagesForGameAsync, addGameData, removeGameData } from './actions';
import { RootAction } from '../types';

import { dasherize } from 'inflection';

export interface PackagesData extends Array<PackageDetails> {
  loading?: boolean;
  error?: Error;
}

export interface GameData {
  packages: PackagesData;
  name: string;
}

export interface GamesMap {
  [game: string]: GameData;
}

export interface GamesState {
  games: GamesMap;
  loading: boolean;
  error?: Error;
}

const initialState: GamesState = {
  games: {},
  loading: false,
  error: null,
};

export const packagesReducer = createReducer<PackagesData, RootAction>([])
  .handleAction(
    fetchPackagesForGameAsync.request,
    (state, action): PackagesData => {
      const newState: PackagesData = [...state];
      newState.loading = true;
      return newState;
    }
  )
  .handleAction(
    fetchPackagesForGameAsync.success,
    (state, action): PackagesData => action.payload.packages
  )
  .handleAction(
    fetchPackagesForGameAsync.failure,
    (state, action): PackagesData => {
      const newState: PackagesData = [...state];
      newState.error = action.payload.error;
      return newState;
    }
  )
  .handleAction(fetchPackagesForGameAsync.cancel, (state, action): PackagesData => [...state]);

const proxyPackagesReducer = (
  game: string,
  state: GamesState,
  action: PayloadAction<any, any>
): GamesState => {
  console.log(state, action);
  return {
    ...state,
    games: {
      ...state.games,
      [game]: {
        ...state.games[game],
        packages: packagesReducer(state.games[game].packages, action),
      },
    },
  };
};

const gamesReducer = createReducer<GamesState, RootAction>(initialState)
  .handleAction(loadGamesAsync.request, (state): GamesState => ({ ...state, loading: true }))
  .handleAction(
    loadGamesAsync.success,
    (state, action): GamesState => ({ ...state, games: action.payload, loading: false })
  )
  .handleAction(
    loadGamesAsync.failure,
    (state, action): GamesState => ({ ...state, loading: false, error: action.payload })
  )
  .handleAction(loadGamesAsync.cancel, (state): GamesState => ({ ...state, loading: false }))
  .handleAction(
    addGameData,
    (state, action): GamesState => ({
      ...state,
      games: { ...state.games, [dasherize(action.payload.name).toLowerCase()]: action.payload },
    })
  )
  .handleAction(
    removeGameData,
    (state, action): GamesState => {
      const { [action.payload]: removed, ...rest } = state.games;
      return { ...state, games: rest };
    }
  )
  .handleAction(
    fetchPackagesForGameAsync.request,
    (state, action): GamesState => proxyPackagesReducer(action.payload, state, action)
  )
  .handleAction(
    fetchPackagesForGameAsync.success,
    (state, action): GamesState => proxyPackagesReducer(action.payload.game, state, action)
  )
  .handleAction(
    fetchPackagesForGameAsync.failure,
    (state, action): GamesState => proxyPackagesReducer(action.payload.game, state, action)
  )
  .handleAction(
    fetchPackagesForGameAsync.cancel,
    (state, action): GamesState => proxyPackagesReducer(action.payload, state, action)
  );

export default gamesReducer;
