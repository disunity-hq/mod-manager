import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import "process";

installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
  .then((name): void => console.log(`Added Extension ${name}`))
  .catch((err): void => console.error(err));

let mainWindow: BrowserWindow;
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  mainWindow.once("ready-to-show", (): void => {
    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
    }
    mainWindow.show();
  });


  const electronUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9000"
      : `file://${__dirname}/index.html`;
  mainWindow.loadURL(electronUrl);

  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", (): void => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", (): void => {
  if (mainWindow === null) createWindow();
});

ipcMain.on("app-close", (): void => {
  app.exit(0);
});

/**
 * TODO: Make them work for focused window instead of the main one.
 */
ipcMain.on("app-minimize", (): void => {
  mainWindow.minimize();
});

ipcMain.on("app-maximize", (): void => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
