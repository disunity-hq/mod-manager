import { Observable, of } from 'rxjs';
import { GamesMap } from '../../../models';
import { TargetInfo } from '../../../models/TargetInfo';

const fakeGameMap: GamesMap = {
  'risk-of-rain-2_1234': {
    id: 'risk-of-rain-2_1234',
    name: 'Risk of Rain 2',
  },
};

const fakeTargetInfo: TargetInfo = {
  disunityVersions: ['2', '1'],
  hashes: { executable: '', path: '' },
  displayName: 'Risk of Rain 2',
  name: 'risk-of-rain-2',
};

export const getAll = (): Observable<GamesMap> => of(fakeGameMap);

export const getDetailsByHash = (): Observable<TargetInfo> => of(fakeTargetInfo);
