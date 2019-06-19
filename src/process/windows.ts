import { BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';

let mainWindow: BrowserWindow;
export function createMainWindow(): BrowserWindow {
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

  return mainWindow;
}

export function getMainWindow(): BrowserWindow {
  return mainWindow;
}
