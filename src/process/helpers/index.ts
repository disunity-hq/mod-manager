import { BrowserWindow, app } from "electron";
import { download } from "electron-dl";
import * as path from "path";
import * as DecompressZip from "decompress-zip";

export default class Helpers {
  static async extractOnlineZip(url: string, extractPath: string) {
    const focusedWindow: BrowserWindow = BrowserWindow.getFocusedWindow();
    const tempFolder: string = app.getPath("temp");
    try {
      await download(focusedWindow, url, {
        directory: tempFolder,
        filename: "temp.zip"
      });
      const savedFile: string = path.join(tempFolder, "temp.zip");
      const unzipper = new DecompressZip(savedFile);

      // decompress-zip doesn't have typescript definitions by default :(
      unzipper.extract({
        path: extractPath
      });
      unzipper.on("error", (err: any) => {
        throw new Error(err);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
