import "process";

let ipcRenderer: Electron.IpcRenderer;
if (process.env.STORYBOOK_ENV) {
    // Simple mock. All property access will return an empty function
    ipcRenderer = new Proxy<Electron.IpcRenderer>(<any>{}, {
        get(target, property, reciever): Function {
            return function (): void {
                console.log(`Electron.ipcRenderer.${property.toString()} called`, arguments);
            };
        }
    });
} else {
    ipcRenderer = require("electron").ipcRenderer;
}

export { ipcRenderer };
