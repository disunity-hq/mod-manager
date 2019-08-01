import { BrowserWindow, app } from 'electron';
import { download } from 'electron-dl';
import * as path from 'path';
import { extractZip } from '../promisified';
import { TargetInfo } from '../../models/TargetInfo';

const TARGET_NAME_HASH_SIZE = 8;

export default class Helpers {
  public static async extractOnlineZip(url: string, extractPath: string) {
    const focusedWindow: BrowserWindow = BrowserWindow.getFocusedWindow();
    const tempFolder: string = app.getPath('temp');
    try {
      await download(focusedWindow, url, {
        directory: tempFolder,
        filename: 'temp.zip',
      });
      const savedFile: string = path.join(tempFolder, 'temp.zip');
      await extractZip(savedFile, extractPath);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const getNameFromTarget = (target: TargetInfo) =>
  `${target.name}-${target.hashes.path.slice(0, TARGET_NAME_HASH_SIZE)}`;

export const getManagedPathFromTarget = (target: TargetInfo): string => {
  const managedTargetFolderName = getNameFromTarget(target);
  const managedFolder = path.join(app.getPath('userData'), 'managed', managedTargetFolderName);
  return managedFolder;
};
