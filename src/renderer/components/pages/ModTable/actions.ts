import { createAsyncAction } from "typesafe-actions";
import { PackageDetails } from "../../../../models";

export const fetchPackagesForGameAsync = createAsyncAction(
  'FETCH_GAME_PACKAGES_REQUEST',
  'FETCH_GAME_PACKAGES_SUCCESS',
  'FETCH_GAME_PACKAGES_FAILURE',
  'FETCH_GAME_PACKAGES_CANCEL',
)<string, PackageDetails, Error, string>();
