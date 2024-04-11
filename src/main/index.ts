import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import path, { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import { Downloader } from "./downloader";
import { ensureSettings } from "./functions";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 850,
    minWidth: 1100,
    minHeight: 550,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    title: "Fetchflix",
    icon: "../../resources/icon.png",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      devTools: !app.isPackaged,
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

  ipcMain.handle("change-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    // TODO: check config file and see if there already a pre-set setting if not then revert to this :)
    if (result.canceled)
      return {
        relativePath: path.relative(
          app.getPath("home"),
          app.getPath("downloads"),
        ),
        absolutePath: app.getPath("downloads"),
      };

    return {
      relativePath: path.relative(app.getPath("home"), result.filePaths[0]),
      absolutePath: result.filePaths[0],
    };
  });

  ipcMain.handle("open-cookies", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        {
          extensions: ["txt"],
          name: "Files",
        },
      ],
    });

    // TODO: cookie validation & store it
    return result;
  });

  ipcMain.handle("start-download", (_, args) => {
    const client = new Downloader({
      cookies: args.cookies,
      credentials: args.credentials,
      url: args.url,
      format: "BEST",
    });

    client.start();
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on("ping", () => console.log("pong"));

  createWindow();
  ensureSettings(app.getPath("userData"), "settings.json");

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
