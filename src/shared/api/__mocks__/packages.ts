import { Observable, of } from 'rxjs';
import { PackageDetails } from '../../../models';

const mockData: { [gameId: string]: PackageDetails[] } = {
  'risk-of-rain-2_1234': [
    { name: 'TestPackage1', owner: 'scott' },
    { name: 'TestPackage2', owner: 'scott' },
  ],
};

export const getAll = (gameId: string): Observable<PackageDetails[]> => {
  console.log(gameId);
  return of(mockData[gameId] || []);
};
