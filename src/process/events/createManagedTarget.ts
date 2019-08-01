import { join } from 'path';
import { app } from 'electron';
import { mkdir, symlink, writeFile } from '../promisified';
import { TargetInfo } from '../../models/TargetInfo';
import { getNameFromTarget, getManagedPathFromTarget } from '../helpers';
import db from '../db';
import createTargetProfile from './createTargetProfile';
import changeTargetProfile from './changeTargetProfile';

const writeTargetMetaFile = async (target: TargetInfo) => {
  const managedDir = getManagedPathFromTarget(target);
  const metaFilePath = join(managedDir, 'targetInfo.json');
  const targetMetadata = JSON.stringify(target);
  await writeFile(metaFilePath, targetMetadata);
};

const createManagedTarget = async (target: TargetInfo) => {
  await createTargetProfile(target);
  await Promise.all([
    db.createTargetDB(target),
    writeTargetMetaFile(target),
    changeTargetProfile(target, 'default'),
  ]);
};

export default createManagedTarget;
