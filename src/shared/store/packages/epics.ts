import { RootAction, RootState } from '../types';
import { Epic, combineEpics } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, delay, catchError, takeUntil, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { fetchPackagesAsync } from './actions';
import { ActionCreator } from 'typesafe-actions/dist/is-action-of';
import { packages } from '../../api';
import * as mockPackages from '../../api/__mocks__/packages';

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
  action$
): Observable<FetchSuccessType | FetchFailureType> =>
  action$.pipe(
    filter(isActionOf(fetchPackagesAsync.request)),
    tap(
      (action): void => {
        if (action.meta !== 'risk-of-rain-2_1234') throw new Error('Only RoR2 is mocked currently');
      }
    ),
    switchMap(
      (
        action: ReturnType<typeof fetchPackagesAsync['request']>
      ): Observable<FetchSuccessType | FetchFailureType> =>
        // packages.getAll(action.meta)
        mockPackages.getAll(action.meta).pipe(
          delay(2000), // simulate network lag for now
          map(payload => fetchPackagesAsync.success(payload, action.meta)),
          catchError(err => of(fetchPackagesAsync.failure(err, action.meta))),
          takeUntil(action$.pipe(filter(isMetaActionOf(fetchPackagesAsync.cancel, action.meta))))
        )
    )
  );

export default combineEpics(fetchPackagesFlow);
