import reducer, { GamesState, GamesMap, GameData, PackagesData, packagesReducer } from './reducer';
import { deepFreeze } from '../../../shared/helpers';

const packages: PackagesData = [{ name: 'TestPackage', owner: 'scott' }];

const ror2 = { name: 'Risk of Rain 2', packages: [] as PackagesData };
const games: GamesMap = {
  'risk-of-rain-2': ror2,
};

const initialState: GamesState = {
  error: undefined,
  loading: false,
  games: {},
};

const loadingState: GamesState = { ...initialState, loading: true };

const withRoR2State: GamesState = { ...initialState, games };

const packagesLoading: PackagesData = { ...[], loading: true };

deepFreeze(initialState);
deepFreeze(loadingState);
deepFreeze(withRoR2State);
deepFreeze(packages);
deepFreeze(packagesLoading);

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
      expect(
        reducer(loadingState, { type: 'LOAD_GAMES_CANCEL', payload: undefined })
      ).toMatchObject<Partial<GamesState>>({
        loading: false,
        error: undefined,
      });
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

describe('packages reducer', (): void => {
  it('should handle FETCH_GAME_PACKAGES_REQUEST', (): void => {
    expect(
      packagesReducer([], {
        type: 'FETCH_GAME_PACKAGES_REQUEST',
        payload: 'risk-of-rain-2',
      })
    ).toMatchObject<Partial<PackagesData>>({ loading: true });
  });
  it('should handle FETCH_GAME_PACKAGES_SUCCESS', (): void => {
    expect(
      packagesReducer(packagesLoading, { type: 'FETCH_GAME_PACKAGES_SUCCESS', payload: packages })
    ).toEqual(packages);
  });
  it('should handle FETCH_GAME_PACKAGES_FAILURE', (): void => {
    const error = new Error('TestError');
    expect(
      packagesReducer(packagesLoading, { type: 'FETCH_GAME_PACKAGES_FAILURE', payload: error })
    ).toMatchObject<Partial<PackagesData>>({
      loading: false,
      error,
    });
  });
  it('should handle FETCH_GAME_PACKAGES_CANCEL', (): void => {
    expect(
      packagesReducer(packagesLoading, {
        type: 'FETCH_GAME_PACKAGES_CANCEL',
        payload: 'risk-of-rain-2',
      })
    ).toMatchObject<Partial<PackagesData>>({
      loading: false,
      error: undefined,
    });
  });
});
