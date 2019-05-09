import "process";

/**
 * TODO: Find a way to replace undefined with something that does no operations,
 * so no errors are being thrown.
 */
let ipcRenderer: undefined | Electron.IpcRenderer;
if (process.env.STORYBOOK_ENV) {
    ipcRenderer = undefined;
} else {
    ipcRenderer = require("electron").ipcRenderer;
}

export { ipcRenderer };
