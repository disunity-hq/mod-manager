import { promisify } from "util";
import * as fs from "fs";
import * as DecompressZip from "decompress-zip";

const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const extractZip = (zipPath: string, extractPath: string) => {
  return new Promise<void>((resolve, reject) => {
    const unzipper = new DecompressZip(zipPath);
    // decompress-zip doesn't have typescript definitions by default :(
    unzipper.extract({
      path: extractPath
    });
    unzipper.on("error", (err: any) => {
      reject(err);
    });
    unzipper.on("extract", () => {
      resolve();
    });
  });
};

export { copyFile, readFile, writeFile, extractZip, unlink };
