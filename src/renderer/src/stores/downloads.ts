import { create } from "zustand";

interface IuseDownloadDir {
  downloadDir: string;
  setDownloadDir: (path: string) => void;
}

export const useDownloadDir = create<IuseDownloadDir>((set) => ({
  downloadDir: "~/Downloads",
  setDownloadDir: (path: string) => set((_) => ({ downloadDir: path })),
}));
