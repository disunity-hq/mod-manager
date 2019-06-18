import packagesReducer, { PackagesData } from './reducer';
import { PackageDetails, Loadable } from '../../../models';

const ROR2_ID = 'risk-of-rain-2';

const loadingRoR2Packages: PackagesData = {
  [ROR2_ID]: { loading: true },
};

const testPackges: PackageDetails[] = [{ name: 'TestPackage', owner: 'scott' }];

const withRoR2Packages: PackagesData = {
  [ROR2_ID]: testPackges,
};

describe('packages reducer', (): void => {
  it('should handle FETCH_GAME_PACKAGES_REQUEST', (): void => {
    expect(
      packagesReducer(
        {},
        {
          type: 'FETCH_GAME_PACKAGES_REQUEST',
          payload: null,
          meta: ROR2_ID,
        }
      )
    ).toMatchObject(loadingRoR2Packages);
  });
  it('should handle FETCH_GAME_PACKAGES_SUCCESS', (): void => {
    expect(
      packagesReducer(loadingRoR2Packages, {
        type: 'FETCH_GAME_PACKAGES_SUCCESS',
        meta: ROR2_ID,
        payload: testPackges,
      })
    ).toEqual({ [ROR2_ID]: testPackges });
  });
  it('should handle FETCH_GAME_PACKAGES_FAILURE', (): void => {
    const error = new Error('TestError');
    const newState = packagesReducer(loadingRoR2Packages, {
      type: 'FETCH_GAME_PACKAGES_FAILURE',
      meta: ROR2_ID,
      payload: error,
    });
    const pkgs = newState[ROR2_ID] as Loadable;
    expect(Array.isArray(pkgs)).toBeFalsy();
    expect(pkgs).toHaveProperty('error', error);
    expect(pkgs.loading).toBeFalsy();
  });
  it('should handle FETCH_GAME_PACKAGES_CANCEL', (): void => {
    const newState = packagesReducer(loadingRoR2Packages, {
      type: 'FETCH_GAME_PACKAGES_CANCEL',
      meta: ROR2_ID,
      payload: null,
    });
    const pkgs = newState[ROR2_ID] as Loadable;
    expect(Array.isArray(pkgs)).toBeFalsy();
    expect(pkgs.loading).toBeFalsy();
    expect(pkgs.error).toBeFalsy();
  });
});
