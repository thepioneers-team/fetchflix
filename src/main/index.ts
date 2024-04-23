import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import discordRpc from "discord-rpc";
import { BrowserWindow, app, dialog, ipcMain, shell } from "electron";
import path, { join } from "path";
import icon from "../../resources/icon.png?asset";
import { Downloader } from "./downloader";
import {
  ensureSettings,
  fetchSettings,
  isError,
  updateSettings,
} from "./functions";
import { PlaylistHelper } from "./helpers/playlist";
import { autoUpdater } from "electron-updater";

import "./menu";

const discordId = "1231671222631272570";
const RPC = new discordRpc.Client({ transport: "ipc" });

discordRpc.register(discordId);

async function registerDiscordRPC() {
  const { allowDiscordRPC } = await fetchSettings();

  if (!RPC || allowDiscordRPC === false) return;

  RPC.setActivity({
    details: "Downloading content made easy",
    largeImageKey: "icon",
    largeImageText: "Fetchflix",
    startTimestamp: new Date(),
    instance: false,
    buttons: [
      {
        label: "Get Fetchflix",
        url: "https://github.com/thepioneers-team/fetchflix/releases",
      },
    ],
  });
}

RPC.on("ready", () => {
  registerDiscordRPC();
});

RPC.login({ clientId: discordId }).catch(() =>
  console.log("Discord not found | RPC connection failed"),
);

export const downloads: { id: string; client: Downloader }[] = [];

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
      devTools: is.dev,
    },
  });

  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  if (process.platform === "darwin") {
    app.dock.setIcon(icon);
    app.setName("Fetchflix");
  }

  mainWindow.setMenuBarVisibility(false); // turn off later

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    autoUpdater.checkForUpdatesAndNotify();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  autoUpdater.on("update-available", () => {
    mainWindow?.webContents.send("update_available");
  });

  autoUpdater.on("update-downloaded", () => {
    mainWindow?.webContents.send("update_downloaded");
  });

  ipcMain.handle("restart_app", () => {
    autoUpdater.quitAndInstall();
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

  ipcMain.handle("get-version", () => {
    return autoUpdater.currentVersion.raw;
  });

  // ipcMain.handle("turbo-mode-update", async (_, arg) => {
  //   await updateSettings({
  //     turboMode: arg,
  //   });
  // });

  ipcMain.handle("change-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    let relativePath = "";
    let absolutePath = "";

    if (result.canceled) {
      const { outputPath } = await fetchSettings();

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

    updateSettings({
      outputPath: absolutePath,
    });

    return {
      relativePath,
      absolutePath,
    };
  });

  ipcMain.handle("change-ffmpeg-location", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        {
          name: "FFmpeg Binary",
          extensions: [".exe", ""],
        },
      ],
    });

    let relativePath = "";
    let absolutePath = "";

    if (result.canceled) {
      const { ffmpegLocation } = await fetchSettings();

      relativePath = path.relative(
        app.getPath("home"),
        ffmpegLocation || app.getPath("userData"),
      );

      absolutePath = ffmpegLocation || "";

      return {
        relativePath,
        absolutePath,
      };
    }

    relativePath = path.relative(app.getPath("home"), result.filePaths[0]);
    absolutePath = result.filePaths[0];

    return {
      relativePath,
      absolutePath,
    };
  });

  ipcMain.handle("save-settings", async (_, settings) => {
    try {
      updateSettings(settings);
      return "success";
    } catch (error) {
      console.error(error);
      return "fail";
    }
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

  ipcMain.handle("start-download", async (_, args) => {
    const playlistManager = new PlaylistHelper({ url: args.url });
    const { promptForPlaylist } = await fetchSettings();

    try {
      const isPlaylist = await playlistManager.validate();

      if (isPlaylist && !args.ignorePlaylist && promptForPlaylist) {
        playlistManager.fetchPlaylistDetails();
        return { playlist: true, loading: true };
      } else {
        const client = new Downloader({
          cookies: args.cookies,
          credentials: args.credentials,
          url: args.url,
          format: args.format || "BEST",
          command: args.command,
          isPlaylist,
        });

        client.start();
        downloads.push({ id: client.id, client });

        return { playlist: false };
      }
    } catch (err) {
      console.error(err);
      const errorMsg = isError(err) ? err.message : "An unknown error occurred";
      return { error: errorMsg, playlist: false };
    }
  });

  ipcMain.handle("cancel-install", (_, args) => {
    const index = downloads.findIndex((x) => x.id === args);
    if (index !== -1) {
      downloads[index].client.cancel();
    }
  });

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
  ensureSettings();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
