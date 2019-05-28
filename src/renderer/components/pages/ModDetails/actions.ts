import { createStandardAction } from 'typesafe-actions';

import { PackageDetails } from '../../../../models';

export const setFocusedPackage = createStandardAction('SET_FOCUSED_MOD')<PackageDetails>();
