import { Observable, of, throwError } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil, delay } from 'rxjs/operators';
import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '../types';
import { isActionOf, PayloadAction } from 'typesafe-actions';
import { fetchPackagesForGameAsync, loadGamesAsync } from './actions';

type FetchFailureType = ReturnType<typeof fetchPackagesForGameAsync['failure']>;
type FetchSuccessType = ReturnType<typeof fetchPackagesForGameAsync['success']>;
type LoadFailureType = ReturnType<typeof loadGamesAsync['failure']>;
type LoadSuccessType = ReturnType<typeof loadGamesAsync['success']>;

export const fetchPackagesForGameFlow: Epic<RootAction, RootAction, RootState, void> = (
  action$,
  store
): Observable<FetchSuccessType | FetchFailureType> =>
  action$.pipe(
    filter(isActionOf(fetchPackagesForGameAsync.request)),
    map(action => {
      if (action.payload !== 'risk-of-rain-2')
        return throwError(new Error('Only RoR2 is mocked currently'));
      return action;
    }),
    switchMap(
      (
        action: ReturnType<typeof fetchPackagesForGameAsync['request']>
      ): Observable<FetchSuccessType | FetchFailureType> =>
        of({ game: action.payload, packages: [{ name: 'Test Package', owner: 'scott' }] }).pipe(
          delay(2000), // simulate network lag for now
          map(fetchPackagesForGameAsync.success),
          catchError(err => of(fetchPackagesForGameAsync.failure(err))),
          takeUntil(action$.pipe(filter(isActionOf(fetchPackagesForGameAsync.cancel))))
        )
    )
  );

export const loadGamesFlow: Epic<RootAction, RootAction, RootState, void> = (
  action$,
  store
): Observable<LoadSuccessType | LoadFailureType> =>
  action$.pipe(
    filter(isActionOf(loadGamesAsync.request)),
    switchMap(
      (action): Observable<LoadSuccessType | LoadFailureType> =>
        of({ 'risk-of-rain-2': { name: 'Risk of Rain 2', packages: [] } }).pipe(
          delay(2000),
          map(loadGamesAsync.success),
          catchError(err => of(loadGamesAsync.failure(err))),
          takeUntil(action$.pipe(filter(isActionOf(loadGamesAsync.cancel))))
        )
    )
  );

export default combineEpics(fetchPackagesForGameFlow, loadGamesFlow);
