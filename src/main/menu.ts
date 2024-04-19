import {
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  app,
  shell,
} from "electron";

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
