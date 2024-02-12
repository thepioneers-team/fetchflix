import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 850,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    title: "Fetchflix",
    icon: "../../resources/icon.png",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  if (process.platform === "darwin") {
    app.dock.setIcon(icon);
    app.setName("Fetchflix");
  }

  mainWindow.setMenuBarVisibility(false); // turn off later

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // event listeners
  ipcMain.handle("get/os", () => {
    return process.platform;
  });

  ipcMain.handle("minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.handle("quit", () => {
    app.quit();
  });

  ipcMain.handle("open-external-url", (_, url) => {
    shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on("ping", () => console.log("pong"));

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
