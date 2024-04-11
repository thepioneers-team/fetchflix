import { create } from "zustand";
import {
  Credentials,
  IuseCookies,
  IuseCredentials,
  IuseFormat,
  browserCookie,
} from "@renderer/types/Credentials";

export const useCredentials = create<IuseCredentials>((set) => ({
  credentials: {
    username: "",
    password: "",
  },
  setCredentials: (cred: Credentials) => set((_) => ({ credentials: cred })),
  setUsername: (username: string) =>
    set((state) => ({
      credentials: { ...state.credentials, username: username },
    })),
  setPassword: (password: string) =>
    set((state) => ({
      credentials: { ...state.credentials, password: password },
    })),
}));

export const useCookies = create<IuseCookies>((set) => ({
  cookies: "none",
  cookiePath: "",
  setCookies: (cookies: browserCookie) => set((_) => ({ cookies: cookies })),
  setCookiePath: (path: string) => set((_) => ({ cookiePath: path })),
}));

export const useFormat = create<IuseFormat>((set) => ({
  format: "best",
  setFormat: (format: string) => set({ format }),
}));
