import { ISettings } from "./validators/settings";

export const defaultSettings: ISettings = {
  outputPath: "<%= path %>",
  outputTemplate: "%(title)s.%(ext)s",
  turboMode: false,
  allowDiscordRPC: true,
  buildChannel: "default",
  ffmpegLocation: "",
  allSubtitles: false,
  annotations: false,
  autoGenerateSubtitles: false,
  description: false,
  disablePartFiles: false,
  metadata: false,
  noMtime: false,
  notifications: true,
  promptForPlaylist: false,
  removeOnFinish: false,
  restrictFileNames: false,
  subtitles: false,
  thumbnail: false,
  customUserAgent: false,
  forceIPVersion: "no-force",
  preferInsecure: false,
  proxyIpAddress: "",
  rateLimit: "",
  refererUrl: "",
  socketTimeout: "",
  sourceIPAddress: "",
  suppressHTTPCertificateValidation: false,
  throttleRate: "",
  unit: "byte",
  audioQuality: 5,
  covertArt: false,
  customPostRenderingCommand: "",
  embedChapters: false,
  sponsorblock: false,
  keepVideo: false,
  splitChapters: false,
  sponsorblockAPIUrl: "",
  sponsorblockRemove: "",
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
