import { app } from "electron";
import axios from "axios";
import * as path from "path";
import { copyFile, writeFile, unlink } from "../promisified";
import Helper from "../helpers";
import { BEPINEX_GITHUB_RELEASE_URL } from "../constants";

const setupBepInEx = async (gameFolderRootPath: string) => {
  try {
    const response_data: Array<any> = await axios
      .get(BEPINEX_GITHUB_RELEASE_URL)
      .then(response => response.data);
    const latest_asset_url: string =
      response_data[0].assets[0].browser_download_url;
    const userData = app.getPath("userData");
    const saveFolder = path.join(userData, path.basename(gameFolderRootPath));

    await Helper.extractOnlineZip(latest_asset_url, saveFolder);
    
    await copyFile(
      path.join(saveFolder, "winhttp.dll"),
      path.join(gameFolderRootPath, "winhttp.dll")
    );

    await unlink(path.join(saveFolder, "winhttp.dll"));
    await unlink(path.join(saveFolder, "doorstop_config.ini"));

    const doorstop_path: string = path.join(
      gameFolderRootPath,
      "doorstop_config.ini"
    );

    const targetAssemblyPath: string = path.join(
      saveFolder,
      "BepInEx\\core\\BepInEx.dll"
    );
    let doorstopConfig = `[UnityDoorstop]\nenabled=true\ntargetAssembly=${targetAssemblyPath}`;
    await writeFile(doorstop_path, doorstopConfig, "utf8");
  } catch (err) {
    throw new Error(err);
  }
};

export default setupBepInEx;
