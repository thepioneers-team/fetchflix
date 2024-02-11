import "./assets/base.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="h-screen bg-[#1D1D1D] text-foreground dark">
        <div className="absolute -top-16 left-4 h-[30rem] w-[30rem] rounded-full bg-[#2DDFC770]"></div>
        <div className="absolute left-0 top-0 z-10 h-full w-full backdrop-blur-[300px]"></div>
        <div className="relative z-10">
          <App />
        </div>
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
