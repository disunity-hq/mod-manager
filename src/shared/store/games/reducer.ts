import { createReducer } from 'typesafe-actions';
import { PackageDetails, Loadable, GameData, GamesMap } from '../../../models';
import { loadGamesAsync, addGameData, removeGameData } from './actions';
import { RootAction } from '../types';

export interface GamesState extends Loadable {
  games: GamesMap;
}

const initialState: GamesState = {
  loading: false,
  error: null,
  games: {},
};

const gamesReducer = createReducer<GamesState, RootAction>(initialState)
  .handleAction(loadGamesAsync.request, (state): GamesState => ({ ...state, loading: true }))
  .handleAction(
    loadGamesAsync.success,
    (state, action): GamesState => ({
      ...state,
      games: { ...action.payload },
      loading: false,
      error: undefined,
    })
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
      games: {
        ...state.games,
        [action.payload.id]: action.payload,
      },
    })
  )
  .handleAction(
    removeGameData,
    (state, action): GamesState => {
      if (state.loading) return state;
      const { [action.payload]: removed, ...rest } = state.games;
      return { ...state, games: rest };
    }
  );

export default gamesReducer;
