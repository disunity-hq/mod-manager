import { app, BrowserWindow } from "electron";
import "process";
import * as url from "url";
import * as path from "path";
let mainWindow: BrowserWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // frame: false,
    webPreferences: {
      webSecurity: false
    }
  });
  mainWindow.once("ready-to-show", () => {
    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
    }
    mainWindow.show();
  });
  let electron_url: string;

  electron_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9000"
      : `file://${__dirname}/index.html`;
  mainWindow.loadURL(electron_url);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});
