import { create } from "zustand";

export interface Log {
  id: string;
  logs: Array<string>;
}

interface IUseLogs {
  data?: Log;
  setData: (path: Log) => void;
  resetData: () => void;
}

export const useLogs = create<IUseLogs>((set) => ({
  setData: (data: Log) => set({ data }),
  resetData: () => set({ data: undefined }),
}));
