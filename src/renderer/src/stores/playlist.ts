import { create } from "zustand";

export type Playlist = {
  title: string;
  thumbnail: string;
  index: number;
};

type Playlists = Array<Playlist>;

interface IUsePlaylist {
  playlist?: Playlists;
  setPlaylists: (playlists: Playlists) => void;
  reset: () => void;
}

export const usePlaylistStore = create<IUsePlaylist>((set) => ({
  setPlaylists: (playlist: Playlists) => set({ playlist }),
  reset: () => set({ playlist: undefined }),
}));
