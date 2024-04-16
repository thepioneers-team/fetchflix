import { create } from "zustand";

interface IUsePlaylist {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const usePlaylistStore = create<IUsePlaylist>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
