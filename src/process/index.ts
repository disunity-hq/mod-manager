import 'regenerator-runtime/runtime';

import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import 'process';
import { configureStore } from '../shared/store';
import { calcTargetHashes, createManagedTarget } from './events';
import { createMainWindow, getMainWindow } from './windows';
import { ipcConstants } from '../shared/constants';
import { TargetInfo } from '../models/TargetInfo';
import { addGameData } from '../shared/store/games/actions';
import { getNameFromTarget } from './helpers';
import { push } from 'connected-react-router';

installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
  .then((name): void => console.log(`Added Extension ${name}`))
  .catch((err): void => console.error(err));

const store = configureStore();

app.on('ready', createMainWindow);

app.on(
  'window-all-closed',
  (): void => {
    if (process.platform !== 'darwin') app.quit();
  }
);

app.on(
  'activate',
  (): void => {
    if (getMainWindow() === null) createMainWindow();
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
      getMainWindow().minimize();
    }
  }
);

ipcMain.on(
  'app-maximize',
  (event: Electron.Event): void => {
    let win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      // fallback to operating on main window
      win = getMainWindow();
    }
    win.isMaximized() ? win.unmaximize() : win.maximize();
  }
);

ipcMain.on(ipcConstants.CALC_TARGET_HASHES, async (event: Electron.Event, filePath: string) => {
  try {
    const hashes = await calcTargetHashes(filePath);
    event.sender.send(ipcConstants.TARGET_HASHING_RESULTS, hashes);
    console.log(hashes);
  } catch (err) {
    event.sender.send(ipcConstants.TARGET_HASHING_ERROR, err);
  }
});

ipcMain.on(
  ipcConstants.CREATE_MANAGED_TARGET,
  async (event: Electron.Event, target: TargetInfo) => {
    await createManagedTarget(target);
    const targetName = getNameFromTarget(target);
    store.dispatch(addGameData({ name: target.displayName, id: targetName }));
    store.dispatch(push(`/games/${targetName}`));
  }
);
