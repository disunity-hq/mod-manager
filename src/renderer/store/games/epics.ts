import { Observable, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil, delay } from 'rxjs/operators';
import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '../types';
import { isActionOf } from 'typesafe-actions';
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
    switchMap(
      (action): Observable<FetchSuccessType | FetchFailureType> =>
        of([]).pipe(
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
        of({}).pipe(
          delay(2000),
          map(loadGamesAsync.success),
          catchError(err => of(loadGamesAsync.failure(err))),
          takeUntil(action$.pipe(filter(isActionOf(loadGamesAsync.cancel))))
        )
    )
  );

export default combineEpics(fetchPackagesForGameFlow);
