import { spawn } from "child_process";
import { app } from "electron";
import { ulid } from "ulid";
import fs from "fs";
import { ensureDump } from "../functions";

type PlaylistHelperArgs = {
  url: string;
};

export class PlaylistHelper {
  url: string;
  id: string = ulid();
  playlists: Array<{ title: string; thumbnail: string; index: number }> = [];

  constructor({ url }: PlaylistHelperArgs) {
    this.url = url;
  }

  async validate(): Promise<void> {
    console.log("VALIDATION");

    try {
      const binaryName = `yt-dlp${process.platform === "win32" ? ".exe" : ""}`;
      const fullPath = `${app.getPath("userData")}/${binaryName}`;
      const outputFile = `${app.getPath("userData")}/dump/dump-${this.id}.json`;

      await ensureDump();
      console.log("DUMP ENSURED");

      const output = await this.runYtdl(fullPath);
      await fs.promises.writeFile(outputFile, output, { encoding: "utf8" });

      console.log("Data saved to file:", outputFile);
      await this.processOutput(outputFile);
    } catch (error) {
      console.error("Validation failed:", error);
      throw error;
    }
  }

  private async runYtdl(fullPath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const ytdl = spawn(fullPath, ["-J", "--skip-download", this.url]);
      let output = "";

      ytdl.stdout.on("data", (data) => {
        output += data.toString();
        console.log("GATHER INFO...");
      });

      ytdl.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      ytdl.on("close", (code) => {
        if (code !== 0) {
          reject(`yt-dlp process exited with code ${code}`);
        } else {
          resolve(output);
        }
      });
    });
  }

  private async processOutput(outputFile: string): Promise<void> {
    try {
      const data = await fs.promises.readFile(outputFile, { encoding: "utf8" });
      const jsonData = JSON.parse(data);

      console.log("PROCESSING OUTPUT");

      if (jsonData.entries) {
        console.log("OUTPUT IS PLAYLIST");

        this.playlists = jsonData.entries.map((entry, index) => ({
          title: entry.title,
          thumbnail: entry.thumbnail,
          index,
        }));

        fs.unlinkSync(`${app.getPath("userData")}/dump/dump-${this.id}.json`);
      } else {
        throw new Error("No entries found in the playlist.", {
          cause: "NOT PLAYLIST",
        });
      }
    } catch (error) {
      console.error("Failed to process output file:", error);
      throw error;
    }
  }
}
