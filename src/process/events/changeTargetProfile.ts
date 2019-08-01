import { getManagedPathFromTarget } from '../helpers';
import { join } from 'path';
import { TargetInfo } from '../../models/TargetInfo';
import { rename, symlink, exists } from '../promisified';

const changeTargetProfile = async (target: TargetInfo, profileName: string) => {
  const managedDir = getManagedPathFromTarget(target);
  const profilesDir = join(managedDir, 'profiles');
  const activeProfile = join(profilesDir, 'active');
  const profileDir = join(profilesDir, profileName);
  let shouldRestore = false;
  if (await exists(activeProfile)) {
    await rename(activeProfile, activeProfile + '.bak');
    shouldRestore = true;
  }
  try {
    await symlink(profileDir, activeProfile, 'dir');
  } catch {
    if (shouldRestore) {
      await rename(activeProfile + '.bak', activeProfile);
    }
  }
};

export default changeTargetProfile;
