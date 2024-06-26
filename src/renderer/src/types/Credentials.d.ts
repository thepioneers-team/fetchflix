export type browserCookie =
  | "chrome"
  | "firefox"
  | "brave"
  | "vivaldi"
  | "safari"
  | "chromium"
  | "edge"
  | "opera"
  | "none"
  | "custom";

export type Credentials = {
  username: string;
  password: string;
};

export interface IuseCredentials {
  credentials: Credentials;
  setCredentials: (cred: Credentials) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

export interface IuseCookies {
  cookies: browserCookie;
  cookiePath: string;
  setCookies: (cookies: browserCookie) => void;
  setCookiePath: (path: string) => void;
}

export interface IuseFormat {
  format: string;
  setFormat: (format: string) => void;
}
