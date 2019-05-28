import { Observable, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '../../../store/types';
import { isActionOf } from 'typesafe-actions';
import { fetchPackagesForGameAsync } from './actions';

type FailureType = ReturnType<typeof fetchPackagesForGameAsync['failure']>;
type SuccessType = ReturnType<typeof fetchPackagesForGameAsync['success']>;

export const fetchPackagesForGameFlow: Epic<RootAction, RootAction, RootState, void> = (
  action$,
  store
): Observable<any> =>
  action$.pipe(
    filter(isActionOf(fetchPackagesForGameAsync.request)),
    switchMap(
      (action): Observable<SuccessType | FailureType> =>
        of([]).pipe(
          map(fetchPackagesForGameAsync.success),
          catchError(err => of(fetchPackagesForGameAsync.failure(err))),
          takeUntil(action$.pipe(filter(isActionOf(fetchPackagesForGameAsync.cancel))))
        )
    )
  );

export default combineEpics(fetchPackagesForGameFlow);
