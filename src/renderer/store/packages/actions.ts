import { createAsyncAction } from 'typesafe-actions';
import { PackageDetails } from '../../../models';
import { createAsyncMetaAction } from '../helpers';

export interface FetchPackagesResults {
  game: string;
  packages: PackageDetails[];
}

export interface FetchPackagesError {
  game: string;
  error: Error;
}

export const fetchPackagesAsync = createAsyncMetaAction(
  'FETCH_GAME_PACKAGES_REQUEST',
  'FETCH_GAME_PACKAGES_SUCCESS',
  'FETCH_GAME_PACKAGES_FAILURE',
  'FETCH_GAME_PACKAGES_CANCEL'
)<void, PackageDetails[], Error, void>();
