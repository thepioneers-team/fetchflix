export type DownloadStats = {
  id: string;
  download_stats: {
    percent: number;
    eta: string;
    duration: string;
    bytes: string;
    rate: string;
  };
  video_info: {
    status: "INACTIVE" | "ACTIVE" | "CANCELED" | "FINISHED" | "PAUSED";
    title: string;
    thumbnail: string;
    url: string;
  };
};

export type Playlist = { title: string; thumbnail: string; index: number };

export type PlaylistDetails = {
  id: string;
  playlists: Array<Playlist>;
};
