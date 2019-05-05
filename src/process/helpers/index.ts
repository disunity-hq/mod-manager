import axios from "axios";
import { BrowserWindow, app } from "electron";
import { download } from "electron-dl";
import * as path from "path";
import * as DecompressZip from "decompress-zip";
import { unzip } from "zlib";

export function extractOnlineZip(
  url: string,
  extractPath: string
): Promise<any> {
  const focusedWindow: BrowserWindow = BrowserWindow.getFocusedWindow();
  const tempFolder: string = app.getPath("temp");
  return new Promise((resolve, reject) => {
    download(focusedWindow, url, {
      directory: tempFolder,
      filename: "temp.zip"
    })
      .then(_ => {
        const savedFile: string = path.join(tempFolder, "temp.zip");
        const unzipper = new DecompressZip(savedFile);
        unzipper.extract({
          path: extractPath
        });
        unzipper.on("extract", () => resolve());
        unzipper.on("error", (err: any) => reject(err));
      })
      .catch(err => reject(err));
  });
}
