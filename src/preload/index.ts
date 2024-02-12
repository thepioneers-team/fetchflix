import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
export const api = {
  downloads: {
    start: (url: string) => ipcRenderer.invoke("start-download", url),
  },
  info: {
    getOS: () => ipcRenderer.invoke("get/os"),
  },
  app: {
    minimize: () => ipcRenderer.invoke("minimize"),
    quit: () => ipcRenderer.invoke("quit"),
    openExternalURL: (url) => ipcRenderer.invoke("open-external-url", url),
    changeDirectory: () => ipcRenderer.invoke("change-directory"),
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
