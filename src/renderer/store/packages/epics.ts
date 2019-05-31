import { RootAction, RootState } from '../types';
import { Epic, combineEpics } from 'redux-observable';
import { Observable, throwError, of } from 'rxjs';
import { filter, map, switchMap, delay, catchError, takeUntil } from 'rxjs/operators';
import { isActionOf, Action, MetaAction } from 'typesafe-actions';
import { fetchPackagesAsync } from './actions';
import { ActionCreator } from 'typesafe-actions/dist/is-action-of';

type FetchFailureType = ReturnType<typeof fetchPackagesAsync['failure']>;
type FetchSuccessType = ReturnType<typeof fetchPackagesAsync['success']>;

const isMetaActionOf = <
  AC extends ActionCreator<MA>,
  MA extends { type: string; meta?: TMeta },
  TMeta
>(
  actionCreator: AC,
  meta: TMeta
) => (action: MA): boolean => action.meta === meta && isActionOf(actionCreator)(action);

export const fetchPackagesFlow: Epic<RootAction, RootAction, RootState, void> = (
  action$,
  store
): Observable<FetchSuccessType | FetchFailureType> =>
  action$.pipe(
    filter(isActionOf(fetchPackagesAsync.request)),
    map(action => {
      if (action.meta !== 'risk-of-rain-2')
        return throwError(new Error('Only RoR2 is mocked currently'));
      return action;
    }),
    switchMap(
      (
        action: ReturnType<typeof fetchPackagesAsync['request']>
      ): Observable<FetchSuccessType | FetchFailureType> =>
        of([{ name: 'TestPackage', owner: 'scott' }]).pipe(
          delay(2000), // simulate network lag for now
          map(payload => fetchPackagesAsync.success(payload, action.meta)),
          catchError(err => of(fetchPackagesAsync.failure(err, action.meta))),
          takeUntil(action$.pipe(filter(isMetaActionOf(fetchPackagesAsync.cancel, action.meta))))
        )
    )
  );

export default combineEpics(fetchPackagesFlow);
