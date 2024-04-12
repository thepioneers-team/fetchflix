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
    status: string;
    title: string;
    thumbnail: string;
  };
};
