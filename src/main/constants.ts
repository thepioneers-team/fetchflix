import { ISettings } from "./validators/settings";

export const defaultSettings: ISettings = {
  outputPath: "<%= path %>",
  outputTemplate: "%(title)s.%(ext)s",
  turboMode: false,
  allowDiscordRPC: true,
};

export const darwinYTDL =
  "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp";

export const windowsYTDL =
  "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe";

export const linuxYTDL =
  "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp";

export enum ERRORS {
  NOT_PLAYLIST = "NOT PLAYLIST",
}
