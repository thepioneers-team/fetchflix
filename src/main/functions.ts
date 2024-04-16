import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import {
  darwinYTDL,
  defaultSettings,
  linuxYTDL,
  windowsYTDL,
} from "./constants";
import { ISettings } from "./validators/settings";
import { IncomingMessage, Notification, app, net } from "electron";
import fs from "fs";

export async function ensureSettings(fullPath: string, fileName: string) {
  const file = path.join(fullPath, fileName);

  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify(defaultSettings), "utf-8");
  }
}

export function fetchSettings(settingsPath: string): Promise<ISettings> {
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

export function updateSettings(
  settingsPath: string,
  updates: Partial<ISettings>,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const fileContents = await fetchSettings(settingsPath);
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
