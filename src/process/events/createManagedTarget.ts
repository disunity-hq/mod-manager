import { join } from 'path';
import { app } from 'electron';
import { mkdir } from '../promisified';
import { TargetInfo } from '../../models/TargetInfo';
import { getNameFromTarget } from '../helpers';
import db from '../db';

const createManagedTarget = async (target: TargetInfo) => {
  const managedTargetFolderName = getNameFromTarget(target);
  const managedFolder = join(app.getPath('userData'), 'managed', managedTargetFolderName);
  await Promise.all([mkdir(managedFolder, { recursive: true }), db.createTargetDB(target)]);
};

export default createManagedTarget;
