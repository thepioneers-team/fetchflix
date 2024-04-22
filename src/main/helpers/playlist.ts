import { spawn } from "child_process";
import { BrowserWindow, app, Notification } from "electron";
import { ulid } from "ulid";
import fs from "fs";
import { ensureDump, sendNotification } from "../functions";

type PlaylistHelperArgs = {
  url: string;
};

export class PlaylistHelper {
  url: string;
  id: string = ulid();

  constructor({ url }: PlaylistHelperArgs) {
    this.url = url;
  }

  async validate(): Promise<boolean> {
    console.log("Validation start");
    const binaryName = `yt-dlp${process.platform === "win32" ? ".exe" : ""}`;
    const fullPath = `${app.getPath("userData")}/${binaryName}`;

    try {
      const output = await this.checkIfPlaylist(fullPath);
      const isPlaylist = this.isPlaylist(output);
      return isPlaylist; // Immediately return if it's a playlist or not
    } catch (error) {
      console.error("Validation failed:", error);
      throw error;
    }
  }

  private async checkIfPlaylist(fullPath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const ytdl = spawn(fullPath, [
        "--dump-single-json", // Change to dump-single-json to ensure complete metadata is fetched
        "--playlist-end",
        "1",
        this.url,
      ]);
      let output = "";

      ytdl.stdout.on("data", (data) => {
        output += data.toString();
      });

      ytdl.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
        reject(new Error(`stderr: ${data}`));
      });

      ytdl.on("close", (code) => {
        console.log("YT-DLP finished with code:", code); // Debug: See the exit code
        console.log("YT-DLP output:", output); // Debug: Inspect the raw output
        if (code !== 0) {
          reject(new Error(`yt-dlp process exited with code ${code}`));
        } else {
          resolve(output);
        }
      });
    });
  }

  private isPlaylist(output: string): boolean {
    const jsonData = JSON.parse(output);
    // console.log("Parsed JSON Data:", jsonData); // Debug: Inspect parsed JSON data
    return !!jsonData._type && jsonData._type === "playlist"; // Check if _type is "playlist"
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
    const win = BrowserWindow.getAllWindows()[0];
    const isWindowFocused = BrowserWindow.getFocusedWindow() !== null;

    try {
      const data = await fs.promises.readFile(outputFile, { encoding: "utf8" });
      const jsonData = JSON.parse(data);

      console.log("Processing playlist output");

      if (jsonData.entries) {
        console.log("Output is a playlist");

        const playlists = jsonData.entries.map((entry, index) => ({
          title: entry.title,
          thumbnail: entry.thumbnail,
          index,
        }));

        win?.webContents.send("playlist-details", {
          id: this.id,
          playlists,
        });

        if (isWindowFocused === false)
          await sendNotification({
            title: "Fetching completed",
            body: "Finished fetching playlist items",
          });

        // Optionally, clean up the temporary file after processing
        fs.unlinkSync(outputFile);
      } else {
        throw new Error("No entries found in the playlist.", {
          cause: "NOT_PLAYLIST",
        });
      }
    } catch (error) {
      console.error("Failed to process output file:", error);
      throw error;
    }
  }

  // This method now handles the intensive data processing
  async fetchPlaylistDetails(): Promise<void> {
    const binaryName = `yt-dlp${process.platform === "win32" ? ".exe" : ""}`;
    const fullPath = `${app.getPath("userData")}/${binaryName}`;
    const outputFile = `${app.getPath("userData")}/dump/dump-${this.id}.json`;

    await ensureDump();

    const output = await this.runYtdl(fullPath);
    await fs.promises.writeFile(outputFile, output, { encoding: "utf8" });
    await this.processOutput(outputFile);
  }
}
