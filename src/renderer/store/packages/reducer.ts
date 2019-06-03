import { RootAction } from '../types';
import { PackageDetails, Loadable } from '../../../models';
import { createReducer } from 'typesafe-actions';
import { fetchPackagesAsync } from './actions';

export interface PackagesData {
  [id: string]: PackageDetails[] | Loadable;
}

const packagesReducer = createReducer<PackagesData, RootAction>({})
  .handleAction(
    fetchPackagesAsync.request,
    (state, action): PackagesData => ({ ...state, [action.meta]: { loading: true } })
  )
  .handleAction(
    fetchPackagesAsync.success,
    (state, action): PackagesData => ({ ...state, [action.meta]: action.payload })
  )
  .handleAction(
    fetchPackagesAsync.failure,
    (state, action): PackagesData => ({ ...state, [action.meta]: { error: action.payload } })
  )
  .handleAction(
    fetchPackagesAsync.cancel,
    (state, action): PackagesData => ({ ...state, [action.meta]: { loading: false } }) //TODO decide how to react to this
  );

export default packagesReducer;
