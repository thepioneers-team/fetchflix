import { create } from "zustand";

type EventsTypes = "REMOVE_DOWNLOAD";

type EventData = {
  type: EventsTypes;
  payload: object;
};

interface IUseDownload {
  event?: EventData;
  setEvent: (event: EventData) => void;
  resetEvent: () => void;
}

export const useDownload = create<IUseDownload>((set) => ({
  setEvent: (event: EventData) => set({ event }),
  resetEvent: () => set({ event: undefined }),
}));
