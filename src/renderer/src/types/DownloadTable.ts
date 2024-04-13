export type Download = {
  id: string;
  progress: number;
  status: "INACTIVE" | "ACTIVE" | "CANCELED" | "FINISHED" | "PAUSED";
  thumbnail: string;
  title: string;
  eta: string;
  rate: string;
  size: string;
  url: string;
};
