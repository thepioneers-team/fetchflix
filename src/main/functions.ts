import { existsSync, writeFileSync } from "fs";
import path from "path";
import { defaultSettings } from "./constants";

export async function ensureSettings(fullPath: string, fileName: string) {
  const file = path.join(fullPath, fileName);

  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify(defaultSettings), "utf-8");
  }
}
