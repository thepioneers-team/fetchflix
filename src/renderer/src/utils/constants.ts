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

export const linkRegex =
  /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/gm;
