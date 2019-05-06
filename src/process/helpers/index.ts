import { BrowserWindow, app } from "electron";
import { download } from "electron-dl";
import * as path from "path";
import { extractZip } from "../promisified";

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
      await extractZip(savedFile, extractPath);
    } catch (e) {
      throw new Error(e);
    }
  }
}
