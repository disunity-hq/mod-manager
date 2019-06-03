import { Observable, of } from 'rxjs';
import { GamesMap } from '../../../models';

const fakeData: GamesMap = {
  'risk-of-rain-2_1234': {
    id: 'risk-of-rain-2_1234',
    name: 'Risk of Rain 2',
  },
};

export const getAll = (): Observable<GamesMap> => of(fakeData);
