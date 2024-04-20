import type { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";
import { BrowserWindow, app, Notification } from "electron";
import fs from "fs";
import template from "lodash.template";
import { ulid } from "ulid";
import { ensureYTDL, fetchSettings } from "./functions";

// TODO: add an function to stream responses to the frontend using ipc

const ARG_TEMPLATE = "--progress-template";

const TEMPLATE =
  "%(progress._percent_str)s,%(progress._speed_str)s,%(progress._eta_str)s,%(progress._total_bytes_str)s,%(progress.status)s,%(progress._elapsed_str)s,[status]";

type Credentials = {
  username: string;
  password: string;
};

type DownloadArgs = {
  url: string;
  format: string;
  cookies:
    | "firefox"
    | "chrome"
    | "brave"
    | "vivaldi"
    | "chromium"
    | "edge"
    | "opera"
    | "none";
  credentials: Credentials;
  command?: string;
  isPlaylist: boolean;
};

type Stats = {
  percent: number;
  bytes: string;
  rate: string;
  eta: number | string;
  duration: string;
};

type Status = "INACTIVE" | "ACTIVE" | "CANCELED" | "FINISHED" | "PAUSED";

export class Downloader {
  // downloader info
  private initialized: boolean = false;
  private paused: boolean = false;
  private canceled: boolean = false;
  private done: boolean = false;
  private active: boolean = false;
  private ytdl_path: string = "";
  private process: ChildProcessWithoutNullStreams | undefined;

  // errors
  ffmpegError: boolean = false;
  errorMsg: string | undefined;
  error: boolean = false;

  // private video info
  title: string = "";
  isPlaylist: boolean = false;
  private thumbnail: string = "";

  logs: Array<string> = [];

  // video info / Job info
  status: Status = "INACTIVE";
  id: string = ulid();
  url: string = "";
  format: string = "";
  cookies: string = "";
  credentials: Credentials = { username: "", password: "" };
  outputPath: string = "";
  command: string | undefined;
  stats: Stats = {
    percent: 0,
    eta: 0,
    duration: "0",
    bytes: "0",
    rate: "0",
  };

  constructor({
    url,
    format,
    cookies,
    credentials,
    command,
    isPlaylist,
  }: DownloadArgs) {
    this.url = url;
    this.format = format;
    this.cookies = cookies;
    this.credentials = credentials;
    this.command = command;
    this.isPlaylist = isPlaylist;
  }

  async start() {
    if (!this.initialized) this.initialized = true;

    console.log("initalized check passed");

    if (this.canceled) {
      this.title = this.title.replace("[PENDING]", "[CANCELLED]");
      this.thumbnail = "cancelled";
      return;
    }

    console.log("not canceled");

    if (this.done) return; // set some stats or data to tell the frontend its actually done

    console.log("is not done");

    if (!this.paused) {
      console.log("is not paused");
      this.sendStats();

      this.active = true;
      this.done = false;

      const ytdlPath = await ensureYTDL(); // change to this.ensureYTDL() if needed

      this.ytdl_path = ytdlPath;

      this.getMetadata();

      await this.downloadVideo();
      console.log("downloading data again");
    }
  }

  // private ensureYTDL(): Promise<string> {
  //   const binaryName = `yt-dlp${process.platform === "win32" ? ".exe" : ""}`;
  //   const fullPath = `${app.getPath("userData")}/${binaryName}`;

  //   console.log("Ensuring YTDL");

  //   return new Promise((resolve, reject) => {
  //     if (fs.existsSync(fullPath)) {
  //       console.log("YTDL already exists");
  //       resolve(fullPath);
  //     } else {
  //       console.log("YTDL Binary was not found!");
  //       this.sendLogs(
  //         "[ WARNING ] yt-dlp binary file was not found... Installing.",
  //       );
  //       this.downloadYTDLFromGithub(fullPath)
  //         .then(() => resolve(fullPath))
  //         .catch((error) => {
  //           console.error("Failed to download YTDL:", error);
  //           reject(error);
  //         });
  //     }
  //   });
  // }

  // private downloadYTDLFromGithub(fullPath: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const platform = process.platform;
  //     console.log("Downloading YTDL from GitHub");

  //     let url: string = "";
  //     switch (platform) {
  //       case "darwin":
  //         url = darwinYTDL;
  //         break;
  //       case "win32":
  //         url = windowsYTDL;
  //         break;
  //       case "linux":
  //         url = linuxYTDL;
  //         break;
  //       default:
  //         reject(new Error(`Unsupported platform: ${platform}`));
  //         return;
  //     }

  //     const request = net.request(url);
  //     request.on("response", (response: IncomingMessage) => {
  //       if (response.statusCode === 200) {
  //         const fileStream = fs.createWriteStream(fullPath);
  //         response.on("data", (chunk: Buffer) => fileStream.write(chunk));
  //         response.on("end", () => {
  //           fileStream.end(() => {
  //             console.log("YTDL downloaded and saved successfully.");
  //             resolve();
  //           });
  //         });
  //         response.on("error", (error: Error) => {
  //           console.error("Error writing file:", error);
  //           fileStream.close();
  //           reject(error);
  //         });
  //       } else {
  //         reject(
  //           new Error(
  //             `Failed to download YTDL: ${response.statusCode} ${response.statusMessage}`,
  //           ),
  //         );
  //       }
  //     });
  //     request.on("error", (error) => {
  //       console.error("Error downloading file:", error);
  //       reject(error);
  //     });
  //     request.end();
  //   });
  // }

  private getMetadata() {
    this.sendLogs("Gathering metadata...");

    const playlistFlag = this.url.includes("list=") ? "--yes-playlist" : "";

    const args = ["--get-title", "--get-thumbnail", this.url];
    if (playlistFlag) {
      args.push(playlistFlag);
    }

    const processor = spawn(this.ytdl_path, args);

    processor.stdout.on("data", (data) => {
      const lines = data
        .toString()
        .split("\n")
        .filter((line: string) => line.trim() !== "");
      this.title = lines[0];
      this.thumbnail = lines.length > 1 ? lines[1] : "No thumbnail available";

      this.sendLogs("Metadata gathered: " + lines.join("; "));
      this.sendStats();

      processor.kill();
    });

    processor.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
      this.sendLogs(
        `Failed to fetch metadata (thumbnail | title) for ${this.url}`,
      );
    });
  }

  private async buildCommand() {
    let { outputPath, outputTemplate } = await fetchSettings();

    if (outputPath?.includes("<%= path %>"))
      outputPath = template({ path: app.getPath("downloads") });

    this.outputPath = outputPath!;

    const args = [
      "--output",
      `${outputPath}/${outputTemplate}`,
      ARG_TEMPLATE,
      TEMPLATE,
    ];

    const { username, password } = this.credentials;

    if (username !== "") args.push("--username", username);
    if (password !== "") args.push("--password", password);
    if (this.command) args.unshift(...this.command.split(" "));

    args.push(this.url);

    console.log(args);

    return args;
  }

  private isError = (data: string) => {
    return data.indexOf("ERROR: ") !== -1;
  };

  private downloadVideo() {
    const self = this;
    self.status = "ACTIVE";

    const isWindowFocused = BrowserWindow.getFocusedWindow() !== null;

    return new Promise(async (resolve) => {
      const args = await this.buildCommand();

      const processor = spawn(this.ytdl_path, args, {
        windowsHide: true,
      });

      this.process = processor;

      processor.stdout.on("data", (data) => {
        this.parseStats(data.toString());
      });

      processor.stderr.on("data", function (data) {
        self.parseStats(data.toString());
        self.error = true;
        self.sendStats();
      });

      processor.on("exit", function (code) {
        self.active = false;

        if (self.stats.percent === 100) {
          self.status = "FINISHED";
          self.done = true;

          if (isWindowFocused === false) {
            const notification = new Notification({
              title: "Download Complete",
              body: `Finished downloading ${self.url}`,
            });

            notification.show();
          }
        }

        self.process?.kill();

        self.sendStats();

        resolve(code);
      });

      // Capture stderr data for error handling
      processor.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
        this.sendLogs(`Failed to download video for: ${this.url}`);
      });

      // Handle process exit
      processor.on("close", (code) => {
        if (code !== 0) {
          console.error(`Process exited with code ${code}`);
          this.sendLogs(`Failed to download video for: ${this.url}`);
        } else {
          console.log(`Process exited with code ${code}`);
          this.sendLogs(`Process exited with code ${code}`);
        }
      });

      processor.on("error", async function (err) {
        console.log(err.stack?.includes("EACCES"));
        if (err.stack?.includes("EACCES")) {
          await self.chmodValidate();
          self.start();
          return;
        }
        self.logs.push(
          `Failed to execute: ${self.url}.  Error: ${err}.  Please make sure youtube-dl(yt-dlp) is installed on your path.  If you are using a custom path, please make sure it is correct.  Use the Something Not Working menu to re-install youtube-dl(yt-dlp).`,
        );
        // reject(
        //   `Please check the log for more details. Click View Console in the menu for this download.`,
        // );
        // ! CANNOT REJECT AS IT WILL THROW NOTIFICATION ERROR
      });
    });
  }

  private chmodValidate(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.chmod(this.ytdl_path, 0o755, (err) => {
        if (err) {
          console.error(
            `Failed to change permissions for ${this.ytdl_path}`,
            err,
          );
          reject(`Failed to change permissions: ${err.message}`);
        } else {
          console.log(`Permissions changed successfully for ${this.ytdl_path}`);
          resolve();
        }
      });
    });
  }

  private parseStats(data: string) {
    if (data.indexOf("[status]") !== -1) {
      const statusArray = data.split(",");
      const progress = parseInt(statusArray[0].replace("%", ""));
      const speed = statusArray[1];
      const eta = statusArray[2];
      const totalSize = statusArray[3];
      // const status = statusArray[4];
      const elapsed = statusArray[5];

      this.stats.percent = progress;
      this.stats.bytes = totalSize;
      this.stats.eta = eta;
      this.stats.rate = speed;
      this.stats.duration = elapsed;

      this.sendStats();
    }

    this.error = false;
    this.errorMsg = undefined;

    if (this.isError(data)) {
      this.errorMsg = data;
      this.error = true;
      if (data.toLowerCase().indexOf("ffmpeg not found") !== -1) {
        this.ffmpegError = true;
      }
      return;
    }

    if (data.indexOf("has already been recorded") !== -1) {
      this.title = `[ALREADY DOWNLOADED] ${this.url}`;
    }
    if (data.indexOf("frame=") !== -1) {
      this.title = data;
      this.stats.eta = "?";
    }
  }

  private sendStats() {
    let win = BrowserWindow.getAllWindows()[0];

    win?.webContents.send("download-stats", {
      id: this.id,
      download_stats: this.stats,
      video_info: {
        status: this.status,
        title: this.title,
        thumbnail: this.thumbnail,
        url: this.url,
      },
    });
  }

  private sendLogs(log: string) {
    let win = BrowserWindow.getAllWindows()[0];

    this.logs.push(log);

    win?.webContents.send("download-logs", {
      id: this.id,
      logs: this.logs,
    });
  }

  cancel() {
    this.process?.kill();

    this.error = true;
    this.errorMsg = "Cancelled By User";
    this.active = false;

    this.done = true;
    this.canceled = true;

    this.status = "CANCELED";

    if (!this.thumbnail) this.thumbnail = "cancelled";
    this.sendLogs("[Process Cancelled]");
    this.sendStats();
  }

  pause() {
    this.process?.kill();

    this.paused = true;
    this.active = true;

    this.status = "PAUSED";

    this.sendLogs("[Download Paused By User]");
    this.sendStats();
  }

  resume() {
    this.sendLogs("[Download Resumed By User]");

    this.paused = false;
    this.active = true;
    this.canceled = false;

    this.status = "ACTIVE";

    console.log("resuming download");

    this.start();
    this.sendStats();
  }

  reset = () => {
    this.stats = {
      percent: 0,
      bytes: "0",
      rate: "0",
      eta: 0,
      duration: "0",
    };

    this.active = false;
    this.done = false;
    this.error = false;
    this.errorMsg = undefined;
    this.logs = [];
    this.canceled = false;
    this.paused = false;
    this.title = `[PENDING] ${this.url}`;

    return this;
  };
}
