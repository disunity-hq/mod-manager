import { Observable, of, from } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '../types';
import { isActionOf } from 'typesafe-actions';
import { app } from 'electron';
import { loadGamesAsync } from './actions';
import { GamesMap } from '../../../models';
import { readdir } from '../../../process/promisified';
import { join } from 'path';
import db from '../../../process/db';

type LoadFailureType = ReturnType<typeof loadGamesAsync['failure']>;
type LoadSuccessType = ReturnType<typeof loadGamesAsync['success']>;

export const loadGamesFlow: Epic<RootAction, RootAction, RootState, void> = (
  action$,
  store
): Observable<LoadSuccessType | LoadFailureType> =>
  action$.pipe(
    filter(isActionOf(loadGamesAsync.request)),
    switchMap(
      (action): Observable<LoadSuccessType | LoadFailureType> =>
        from(db.loadTargetDBs()).pipe(
          map(() =>
            db.getTargetNames().reduce(
              (obj, targetName): GamesMap => ({
                ...obj,
                [targetName]: { name: 'Risk of Rain 2', id: targetName },
              }),
              {}
            )
          ),
          map(loadGamesAsync.success),
          catchError(err => of(loadGamesAsync.failure(err))),
          takeUntil(action$.pipe(filter(isActionOf(loadGamesAsync.cancel))))
        )
    )
  );

export default combineEpics(loadGamesFlow);
