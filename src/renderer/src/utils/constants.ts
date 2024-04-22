export const FORMATS = [
  {
    isVideo: true,
    value: "3GP",
  },
  {
    isVideo: false,
    value: "AAC",
  },
  {
    isVideo: false,
    value: "FLAC",
  },
  {
    isVideo: true,
    value: "FLV",
  },
  {
    isVideo: true,
    value: "M4A",
  },
  {
    isVideo: false,
    value: "MP3",
  },
  {
    isVideo: true,
    value: "MP4",
  },
  {
    isVideo: false,
    value: "OPUS",
  },
  {
    isVideo: false,
    value: "VORBIS",
  },
  {
    isVideo: false,
    value: "WAV",
  },
  {
    isVideo: true,
    value: "WEBM",
  },
  {
    isVideo: true,
    value: "BEST",
  },
  {
    isVideo: true,
    value: "WORST",
  },
  { separator: true },
  {
    isVideo: true,
    larger: true,
    value: "BESTVIDEO",
  },
  {
    isVideo: true,
    larger: true,
    value: "BESTAUDIO",
  },
  {
    isVideo: true,
    larger: true,
    value: "BESTVIDEO+BESTAUDIO",
  },
  {
    isVideo: true,
    larger: true,
    value: "BESTVIDEO[EXT=MP4]+BESTAUDIO[EXT=M4A]/BEST[EXT=MP4]/BEST",
  },
];

// TODO: add a shared value so we don't have to update this in 2 places

export const defaultSettings = {
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
  promptForPlaylist: true,
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

export const linkRegex =
  /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/gm;
