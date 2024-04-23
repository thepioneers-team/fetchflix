import { IncomingMessage, app, net, Notification, nativeImage } from "electron";
import fs, { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import {
  darwinYTDL,
  defaultSettings,
  linuxYTDL,
  optionMappings,
  windowsYTDL,
} from "./constants";
import { ISettings, SettingsValidator } from "./validators/settings";
import icon from "../../resources/icon.png?asset";

export async function ensureSettings() {
  const file = path.join(app.getPath("userData"), "settings.json");

  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify(defaultSettings), "utf-8");
  } else {
    const settings = await fetchSettings();
    const { success } = SettingsValidator.safeParse(settings);

    if (!success) {
      writeFileSync(file, JSON.stringify(defaultSettings), "utf-8");
    }
  }
}

export function fetchSettings(): Promise<ISettings> {
  const settingsPath = `${app.getPath("userData")}/settings.json`;

  return new Promise((resolve, reject) => {
    let settings: ISettings = {};

    try {
      const fileContents = readFileSync(settingsPath, "utf8");

      settings = JSON.parse(fileContents);

      resolve(settings);
    } catch (err) {
      console.error(`Failed to read settings from ${settingsPath}:`, err);

      reject(err);
    }
  });
}

export function updateSettings(updates: Partial<ISettings>): Promise<void> {
  const settingsPath = `${app.getPath("userData")}/settings.json`;

  return new Promise(async (resolve, reject) => {
    try {
      const fileContents = await fetchSettings();
      let currentSettings: ISettings = fileContents;

      currentSettings = { ...currentSettings, ...updates };

      const updatedFileContents = JSON.stringify(currentSettings, null, 2);

      writeFileSync(settingsPath, updatedFileContents, "utf8");

      resolve();
    } catch (err) {
      console.error(`Failed to update settings in ${settingsPath}:`, err);
      reject(err);
    }
  });
}

export function ensureYTDL(): Promise<string> {
  const binaryName = `yt-dlp${process.platform === "win32" ? ".exe" : ""}`;
  const fullPath = `${app.getPath("userData")}/${binaryName}`;

  console.log("Ensuring YTDL");

  return new Promise((resolve, reject) => {
    if (fs.existsSync(fullPath)) {
      console.log("YTDL already exists");
      resolve(fullPath);
    } else {
      console.log("YTDL Binary was not found!");
      // this.sendLogs(
      //   "[ WARNING ] yt-dlp binary file was not found... Installing.",
      // );
      downloadYTDLFromGithub(fullPath)
        .then(() => resolve(fullPath))
        .catch((error) => {
          console.error("Failed to download YTDL:", error);
          reject(error);
        });
    }
  });
}

export function ensureDump(): Promise<string> {
  const fullPath = `${app.getPath("userData")}/dump`;

  console.log("Ensuring YTDL");

  return new Promise((resolve, reject) => {
    if (fs.existsSync(fullPath)) {
      console.log("YTDL already exists");
      resolve(fullPath);
    } else {
      fs.mkdir(fullPath, (err) => {
        if (err) reject(err);
      });
    }
  });
}

function downloadYTDLFromGithub(fullPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const platform = process.platform;
    console.log("Downloading YTDL from GitHub");

    let url: string = "";
    switch (platform) {
      case "darwin":
        url = darwinYTDL;
        break;
      case "win32":
        url = windowsYTDL;
        break;
      case "linux":
        url = linuxYTDL;
        break;
      default:
        reject(new Error(`Unsupported platform: ${platform}`));
        return;
    }

    const request = net.request(url);
    request.on("response", (response: IncomingMessage) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(fullPath);
        response.on("data", (chunk: Buffer) => fileStream.write(chunk));
        response.on("end", () => {
          fileStream.end(() => {
            console.log("YTDL downloaded and saved successfully.");
            resolve();
          });
        });
        response.on("error", (error: Error) => {
          console.error("Error writing file:", error);
          fileStream.close();
          reject(error);
        });
      } else {
        reject(
          new Error(
            `Failed to download YTDL: ${response.statusCode} ${response.statusMessage}`,
          ),
        );
      }
    });
    request.on("error", (error) => {
      console.error("Error downloading file:", error);
      reject(error);
    });
    request.end();
  });
}

interface ErrorWithCause {
  cause: string;
  message: string;
}

export function isErrorWithCause(error: any): error is ErrorWithCause {
  return (
    error &&
    typeof error.cause === "string" &&
    typeof error.message === "string"
  );
}

export function isError(error: any): error is Error {
  return error instanceof Error;
}

export async function generateArgsFromSettings() {
  const args: string[] = [];

  const settings = await fetchSettings();

  Object.keys(settings).forEach((key) => {
    const value = settings[key];
    const option = optionMappings[key];
    if (option) {
      if (typeof value === "boolean") {
        // Only add the option if the boolean is true
        if (value) {
          args.push(option);
        }
      } else if (key === "forceIPVersion") {
        // Special handling for 'forceIPVersion'
        if (value === "ipv4" || value === "ipv6") {
          args.push(`${option}${value.slice(3)}`); // Adds --force-ipv4 or --force-ipv6
        }
      } else if (value !== "" && value !== "no-force") {
        // For all non-boolean values that are not empty or default 'no-force'
        args.push(
          `${option}=${typeof value === "string" ? `"${value}"` : value}`,
        );
      }
    }
  });

  console.log(args);

  return args;
}

export async function sendNotification({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { notifications } = await fetchSettings();
  if (notifications) {
    const notif = new Notification({
      title,
      body,
      icon: nativeImage.createFromDataURL(icon),
    });
    notif.show();
  }
}
