import { Observable, of, throwError } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil, delay } from 'rxjs/operators';
import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '../types';
import { isActionOf, PayloadAction } from 'typesafe-actions';
import { loadGamesAsync } from './actions';
import { GamesMap } from '../../../models';

type LoadFailureType = ReturnType<typeof loadGamesAsync['failure']>;
type LoadSuccessType = ReturnType<typeof loadGamesAsync['success']>;

const mockData: GamesMap = {
  'risk-of-rain-2_1234': {
    id: 'risk-of-rain-2_1234',
    name: 'Risk of Rain 2',
  },
};

export const loadGamesFlow: Epic<RootAction, RootAction, RootState, void> = (
  action$,
  store
): Observable<LoadSuccessType | LoadFailureType> =>
  action$.pipe(
    filter(isActionOf(loadGamesAsync.request)),
    switchMap(
      (action): Observable<LoadSuccessType | LoadFailureType> =>
        of(mockData).pipe(
          delay(2000),
          map(loadGamesAsync.success),
          catchError(err => of(loadGamesAsync.failure(err))),
          takeUntil(action$.pipe(filter(isActionOf(loadGamesAsync.cancel))))
        )
    )
  );

export default combineEpics(loadGamesFlow);
