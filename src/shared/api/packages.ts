import { Observable } from 'rxjs';
import { PackageDetails } from '../../models';
import { ajax } from 'rxjs/ajax';
import { PACKAGES_API_BASE_URL } from './constants';
import { map } from 'rxjs/operators';

export const getAll = (gameId: string): Observable<PackageDetails[]> =>
  ajax({
    url: PACKAGES_API_BASE_URL + gameId,
  }).pipe(map((res): PackageDetails[] => res.response as PackageDetails[]));
