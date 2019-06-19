import 'process';

let ipcRenderer: Electron.IpcRenderer;
let dialog: Electron.Dialog;
let remote: Electron.Remote;
let devtron: { install: Function; uninstall: Function };
if (process.env.STORYBOOK_ENV) {
  // Simple mock. All property access will return an empty function
  ipcRenderer = new Proxy<Electron.IpcRenderer>(<any>{}, {
    get(target, property, reciever): Function {
      return function(): void {
        console.log(`Electron.ipcRenderer.${property.toString()} called`, arguments);
      };
    },
  });

  dialog = new Proxy<Electron.Dialog>(<any>{}, {
    get(target, property, reciever): Function {
      return function(): void {
        console.log(`Electron.dialog.${property.toString()} called`, arguments);
      };
    },
  });

  remote = new Proxy<Electron.Remote>(<any>{}, {
    get(target, property, reciever): Function {
      return function(): void {
        console.log(`Electron.remote.${property.toString()} called`, arguments);
      };
    },
  });

  devtron = {
    install() {},
    uninstall() {},
  };
} else {
  ipcRenderer = require('electron').ipcRenderer;
  dialog = require('electron').remote.dialog;
  remote = require('electron').remote;
  devtron = require('electron').remote.require('devtron');
}

export { ipcRenderer, dialog, remote, devtron };
