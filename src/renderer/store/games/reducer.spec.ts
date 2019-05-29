import reducer, { GamesState, GamesMap, GameData } from './reducer';
import { deepFreeze } from '../../../shared/helpers';

const ror2 = { name: 'Risk of Rain 2', packages: [{ name: 'TestPackage', owner: 'scott' }] };
const games: GamesMap = {
  'risk-of-rain-2': ror2,
};

const initialState: GamesState = {
  error: null,
  loading: false,
  games: {},
};

const loadingState: GamesState = { ...initialState, loading: true };

const withRoR2State: GamesState = { ...initialState, games };

deepFreeze(initialState);
deepFreeze(loadingState);

describe('games reducer', (): void => {
  it('should handle LOAD_GAMES_REQUEST', (): void => {
    expect(reducer(initialState, { type: 'LOAD_GAMES_REQUEST', payload: undefined })).toMatchObject(
      { loading: true }
    );
  });
  it('should handle LOAD_GAMES_SUCCESS', (): void => {
    expect(reducer(loadingState, { type: 'LOAD_GAMES_SUCCESS', payload: games })).toEqual(
      withRoR2State
    );
  });
  it('should handle LOAD_GAMES_FAILURE', (): void => {
    const error = new Error('TestError');
    expect(reducer(loadingState, { type: 'LOAD_GAMES_FAILURE', payload: error })).toMatchObject({
      loading: false,
      error,
    });
  });
  it('should handle LOAD_GAMES_CANCEL', (): void => {
    expect(reducer(loadingState, { type: 'LOAD_GAMES_CANCEL', payload: undefined })).toMatchObject({
      loading: false,
      error: null,
    });
  });
  it('should handle ADD_GAME_DATA', (): void => {
    expect(reducer(initialState, { type: 'ADD_GAME_DATA', payload: ror2 })).toMatchObject({
      games: { 'risk-of-rain-2': ror2 },
    });
  });
  it('should handle REMOVE_GAME_DATA', (): void => {
    expect(reducer(withRoR2State, { type: 'REMOVE_GAME_DATA', payload: 'risk-of-rain-2' })).toEqual(
      initialState
    );
  });
});
