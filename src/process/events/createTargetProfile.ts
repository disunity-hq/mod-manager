import { TargetInfo } from '../../models/TargetInfo';
import { getNameFromTarget, getManagedPathFromTarget } from '../helpers';
import { join } from 'path';
import { app } from 'electron';
import { mkdir } from '../promisified';

const createTargetProfile = async (
  target: TargetInfo,
  profileName: string = 'default',
  disunityVersion?: string
) => {
  const managedFolder = getManagedPathFromTarget(target);
  const profileDir = join(managedFolder, 'profiles', profileName);
  const modsDir = join(profileDir, 'mods');
  await mkdir(modsDir, { recursive: true });

  // TODO symlink the disunity distro in

  return profileDir;
};

export default createTargetProfile;
