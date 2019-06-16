import 'regenerator-runtime/runtime';

import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import 'process';
import windowStateKeeper from 'electron-window-state';
import { hashFile, hashText } from './promisified';
import { TargetHashes } from '../models/TargetInfo';

installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
  .then((name): void => console.log(`Added Extension ${name}`))
  .catch((err): void => console.error(err));

let mainWindow: BrowserWindow;
function createWindow(): void {
  const mainWindowState = windowStateKeeper({
    defaultHeight: 800,
    defaultWidth: 1000,
  });

  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: false,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });

  mainWindowState.manage(mainWindow);

  mainWindow.once(
    'ready-to-show',
    (): void => {
      if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
      }
      mainWindow.show();
    }
  );

  const electronUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9000'
      : `file://${__dirname}/index.html`;
  mainWindow.loadURL(electronUrl);

  mainWindow.on(
    'closed',
    (): void => {
      mainWindow = null;
    }
  );
}

app.on('ready', createWindow);

app.on(
  'window-all-closed',
  (): void => {
    if (process.platform !== 'darwin') app.quit();
  }
);

app.on(
  'activate',
  (): void => {
    if (mainWindow === null) createWindow();
  }
);

ipcMain.on(
  'app-close',
  (): void => {
    app.exit(0);
  }
);

ipcMain.on(
  'app-minimize',
  (event: Electron.Event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      win.minimize();
    } else {
      // fallback to operating on main window
      mainWindow.minimize();
    }
  }
);

ipcMain.on(
  'app-maximize',
  (event: Electron.Event): void => {
    let win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      // fallback to operating on main window
      win = mainWindow;
    }
    win.isMaximized() ? win.unmaximize() : win.maximize();
  }
);

ipcMain.on('calc-target-hashes', async (event: Electron.Event, filePath: string) => {
  try {
    const executable = await hashFile(filePath);
    const pathHash = await hashText(filePath);
    const results: TargetHashes = { executable, path: pathHash };
    event.sender.send('target-hash-results', results);
  } catch (err) {
    console.error(err);
    event.sender.send('target-hashing-error', err);
  }
});
