import reducer, { GamesState } from './reducer';
import { deepFreeze } from '../../../shared/helpers';
import { GameData, GamesMap } from '../../../models';

const ror2: GameData = { name: 'Risk of Rain 2', id: 'risk-of-rain-2' };
const games: GamesMap = {
  [ror2.id]: ror2,
};

const initialState: GamesState = {
  error: undefined,
  loading: false,
  games: {},
};

const loadingState: GamesState = { ...initialState, loading: true };

const withRoR2State: GamesState = { ...initialState, games };

deepFreeze(initialState);
deepFreeze(loadingState);
deepFreeze(withRoR2State);

describe('games reducer', (): void => {
  describe('`loadGamesAsync` actions', (): void => {
    it('should handle LOAD_GAMES_REQUEST', (): void => {
      expect(
        reducer(initialState, { type: 'LOAD_GAMES_REQUEST', payload: undefined })
      ).toMatchObject<Partial<GamesState>>({ loading: true });
    });
    it('should handle LOAD_GAMES_SUCCESS', (): void => {
      expect(reducer(loadingState, { type: 'LOAD_GAMES_SUCCESS', payload: games })).toEqual(
        withRoR2State
      );
    });
    it('should handle LOAD_GAMES_FAILURE', (): void => {
      const error = new Error('TestError');
      expect(reducer(loadingState, { type: 'LOAD_GAMES_FAILURE', payload: error })).toMatchObject<
        Partial<GamesState>
      >({
        loading: false,
        error,
      });
    });
    it('should handle LOAD_GAMES_CANCEL', (): void => {
      const newState = reducer(loadingState, { type: 'LOAD_GAMES_CANCEL', payload: undefined });
      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeFalsy();
    });
  });
  it('should handle ADD_GAME_DATA', (): void => {
    expect(reducer(initialState, { type: 'ADD_GAME_DATA', payload: ror2 })).toMatchObject<
      Partial<GamesState>
    >({
      games: { 'risk-of-rain-2': ror2 },
    });
  });
  it('should handle REMOVE_GAME_DATA', (): void => {
    expect(reducer(withRoR2State, { type: 'REMOVE_GAME_DATA', payload: 'risk-of-rain-2' })).toEqual(
      initialState
    );
  });
});

// describe('packages reducer', (): void => {
//   it('should handle FETCH_GAME_PACKAGES_REQUEST', (): void => {
//     expect(
//       packagesReducer([], {
//         type: 'FETCH_GAME_PACKAGES_REQUEST',
//         payload: 'risk-of-rain-2',
//       })
//     ).toMatchObject<Partial<PackagesData>>({ loading: true });
//   });
//   it('should handle FETCH_GAME_PACKAGES_SUCCESS', (): void => {
//     expect(
//       packagesReducer(packagesLoading, {
//         type: 'FETCH_GAME_PACKAGES_SUCCESS',
//         payload: { packages, game: 'risk-of-rain-2' },
//       })
//     ).toEqual(packages);
//   });
//   it('should handle FETCH_GAME_PACKAGES_FAILURE', (): void => {
//     const error = new Error('TestError');
//     const newState = packagesReducer(packagesLoading, {
//       type: 'FETCH_GAME_PACKAGES_FAILURE',
//       payload: { error, game: 'risk-of-rain-2' },
//     });
//     expect(newState).toHaveProperty('error', error);
//     expect(newState.loading).toBeFalsy();
//   });
//   it('should handle FETCH_GAME_PACKAGES_CANCEL', (): void => {
//     const newState = packagesReducer(packagesLoading, {
//       type: 'FETCH_GAME_PACKAGES_CANCEL',
//       payload: 'risk-of-rain-2',
//     });
//     expect(newState.loading).toBeFalsy();
//     expect(newState.error).toBeFalsy();
//   });
// });
