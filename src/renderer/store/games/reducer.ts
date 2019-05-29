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

const packagesReducer = createReducer<PackagesData, RootAction>([]);
const gamesReducer = createReducer<GamesState, RootAction>(initialState);

const proxyPackagesReducer = (state: GamesState, action: PayloadAction<any, any>): GamesState => ({
  ...state,
  games: {
    ...state.games,
    [action.payload]: {
      ...state.games[action.payload],
      packages: packagesReducer(state.games[action.payload].packages, action),
    },
  },
});

gamesReducer
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
  );
// .handleAction(fetchPackagesForGameAsync.request, proxyPackagesReducer)
// .handleAction(fetchPackagesForGameAsync.success, proxyPackagesReducer)
// .handleAction(fetchPackagesForGameAsync.failure, proxyPackagesReducer)
// .handleAction(fetchPackagesForGameAsync.cancel, proxyPackagesReducer);

packagesReducer.handleAction(
  fetchPackagesForGameAsync.request,
  (state, action): PackagesData => ({ ...state, loading: true, error: undefined })
);
packagesReducer.handleAction(
  fetchPackagesForGameAsync.success,
  (state, action): PackagesData => ({ ...state, loading: true })
);
packagesReducer.handleAction(
  fetchPackagesForGameAsync.failure,
  (state, action): PackagesData => ({ ...state, loading: true })
);
packagesReducer.handleAction(
  fetchPackagesForGameAsync.cancel,
  (state, action): PackagesData => ({ ...state, loading: true })
);

export default gamesReducer;
