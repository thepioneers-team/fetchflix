import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, app, dialog, ipcMain, shell } from "electron";
import path, { join } from "path";
import icon from "../../resources/icon.png?asset";
import { Downloader } from "./downloader";
import { ensureSettings, fetchSettings, updateSettings } from "./functions";
import { unlinkSync } from "fs";

const downloads: { id: string; client: Downloader }[] = [];

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

    let relativePath = "";
    let absolutePath = "";

    if (result.canceled) {
      const { outputPath } = await fetchSettings(
        `${app.getPath("userData")}/settings.json`,
      );

      relativePath = path.relative(
        app.getPath("home"),
        outputPath || app.getPath("userData"),
      );

      absolutePath = outputPath || app.getPath("userData");

      return {
        relativePath,
        absolutePath,
      };
    }

    relativePath = path.relative(app.getPath("home"), result.filePaths[0]);
    absolutePath = result.filePaths[0];

    updateSettings(`${app.getPath("userData")}/settings.json`, {
      outputPath: absolutePath,
    });

    return {
      relativePath,
      absolutePath,
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

    downloads.push({
      id: client.id,
      client,
    });
  });

  ipcMain.handle("cancel-install", (_, args) => {
    const index = downloads.findIndex((x) => x.id === args);
    if (index !== -1) {
      downloads[index].client.cancel();
    }
  });

  // ipcMain.handle("delete-file", (_, args) => {
  //   const index = downloads.findIndex((x) => x.id === args);
  //   if (index !== -1) {
  //     const client = downloads[index].client;
  //     unlinkSync(path.join(client.outputPath, client.title));
  //   }
  // });

  ipcMain.handle("resume-install", (_, args) => {
    const index = downloads.findIndex((x) => x.id === args);
    if (index !== -1) {
      downloads[index].client.resume();
    }
  });

  ipcMain.handle("pause-install", (_, args) => {
    const index = downloads.findIndex((x) => x.id === args);
    if (index !== -1) {
      downloads[index].client.pause();
    }
  });

  ipcMain.handle("get-logs", async (_, args) => {
    const index = downloads.findIndex((x) => x.id === args);
    if (index !== -1) {
      return downloads[index].client.logs;
    }

    return ["No logs were found for this download"];
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
