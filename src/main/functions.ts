import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { defaultSettings } from "./constants";
import { ISettings } from "./validators/settings";

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
