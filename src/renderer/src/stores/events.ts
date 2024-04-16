import { create } from "zustand";

export type GlobalEvents = "DOWNLOAD_PLAYLIST";

type Event = {
  type: GlobalEvents;
  payload: object;
};

interface IUseEvents {
  event?: Event;
  setEvent: (event: Event) => void;
  reset: () => void;
}

export const useEventStore = create<IUseEvents>()((set) => ({
  setEvent: (event) => set({ event }),
  reset: () => set({ event: undefined }),
}));
