export type DownloadArgs = {
  url: string;
  cookies: string;
  credentials: { username: string; password: string };
  format: string;
  command?: string;
  ignorePlaylist: boolean;
};
