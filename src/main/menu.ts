import { spawn } from "child_process";
import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  app,
  dialog,
  shell,
} from "electron";
import { eventManager } from "./helpers/events";

const isMac = process.platform === "darwin";

const template: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: "Fetchflix",
    submenu: [
      {
        label: "About",
        role: "about",
      },
      { type: "separator" },
      {
        label: "Hide Fetchflix",
        role: "hide",
        enabled: isMac,
      },
      {
        label: "Show Fetchflix",
        role: "unhide",
        enabled: isMac,
      },
      { type: "separator" },
      {
        label: "Quit Fetchflix",
        accelerator: isMac ? "Command+Q" : "Ctrl+Q",
        role: "quit",
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
      {
        label: "Paste and Match Style",
        accelerator: "Shift+CmdOrCtrl+V",
        role: "pasteAndMatchStyle",
      },
      { label: "Delete", role: "delete" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" },
      { type: "separator" },
      {
        label: "Speech",
        submenu: [
          { label: "Start Speaking", role: "startSpeaking" },
          { label: "Stop Speaking", role: "stopSpeaking" },
        ],
      },
    ],
  },
  {
    label: "Tools",
    submenu: [
      {
        label: "Check for update",
        click: () => {
          eventManager.emit("check-for-update");
        },
      },
      {
        label: "Clear yt-dlp cache",
        click: async () => {
          const binaryName = `yt-dlp${process.platform === "win32" ? ".exe" : ""}`;
          const fullPath = `${app.getPath("userData")}/${binaryName}`;

          const win = BrowserWindow.getAllWindows()[0];

          const processor = spawn(fullPath, ["--rm-cache-dir"]);
          let stdout = "";
          processor.stdout.on("data", (data) => {
            stdout += data;
          });
          processor.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
          });
          processor.on("close", (code) => {
            if (code !== 0) {
              dialog.showMessageBox(win, {
                message: `Process exited with code ${code}`,
              });
            } else {
              dialog.showMessageBox(win, {
                message: stdout.trim(),
              });
            }
          });
        },
      },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Report Bug",
        click: async () => {
          shell.openExternal(
            "https://github.com/thepioneers-team/fetchflix/issues",
          );
        },
      },
      {
        label: "Discord",
        click: async () => {
          shell.openExternal("https://discord.gg/code");
        },
      },
    ],
  },
];

app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
