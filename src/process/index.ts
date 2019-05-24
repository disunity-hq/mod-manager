import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import "process";

installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
  .then(name => console.log(`Added Extension ${name}`))
  .catch(err => console.error(err));
  
let mainWindow: BrowserWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

ipcMain.on("app-close", () => {
  app.exit(0);
});

/**
 * TODO: Make them work for focused window instead of the main one.
 */
ipcMain.on("app-minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("app-maximize", () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
