import { create } from "zustand";
import {
  Credentials,
  IuseCookies,
  IuseCredentials,
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
  setCookies: (cookies: browserCookie) => set((_) => ({ cookies: cookies })),
}));
