import { promisify } from 'util';
import * as fs from 'fs';
import * as DecompressZip from 'decompress-zip';
import { createHash } from 'crypto';

const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const extractZip = (zipPath: string, extractPath: string) => {
  return new Promise<void>(
    (resolve, reject): void => {
      const unzipper = new DecompressZip(zipPath);
      // decompress-zip doesn't have typescript definitions by default :(
      unzipper.extract({
        path: extractPath,
      });
      unzipper.on(
        'error',
        (err: any): void => {
          reject(err);
        }
      );
      unzipper.on(
        'extract',
        (): void => {
          resolve();
        }
      );
    }
  );
};

const hashFile = (filePath: string, algorithm = 'md5'): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      fs.createReadStream(filePath)
        .pipe(createHash(algorithm).setEncoding('hex'))
        .on('finish', function() {
          resolve(this.read());
        })
        .on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

const hashText = (text: string, algorithm = 'md5'): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        createHash(algorithm)
          .update(text)
          .digest('hex')
      );
    } catch (err) {
      reject(err);
    }
  });
};

export { copyFile, readFile, writeFile, extractZip, unlink, hashFile, hashText };
