import { createStandardAction } from 'typesafe-actions';

import { IPackageDetails } from '../../../../models';

export const setFocusedPackage = createStandardAction('SET_FOCUSED_MOD')<IPackageDetails>();
