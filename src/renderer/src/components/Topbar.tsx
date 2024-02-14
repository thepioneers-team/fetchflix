import { cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import ExternalURL from "./ExternalURL";
import { config } from "@renderer/config/general";

interface Params {
  onMinimize: () => void;
  onQuit: () => void;
}

function MacOSDisplay({ onMinimize, onQuit }: Params) {
  return (
    <div className="no-drag group flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-[#FF605C] p-0.5">
        <IoMdClose
          className="hidden h-2 w-2 text-black group-hover:block"
          onClick={onQuit}
        />
      </div>
      <div className="h-3 w-3 rounded-full bg-[#00CA4E] p-0.5">
        <FiMinus
          className="hidden h-2 w-2 text-black group-hover:block"
          onClick={onMinimize}
        />
      </div>
    </div>
  );
}

function WindowsDisplay({ onMinimize, onQuit }: Params) {
  return (
    <div className="flex items-center gap-2 ">
      <FiMinus
        className="no-drag h-4.5 w-4.5 cursor-pointer"
        onClick={onMinimize}
      />
      <IoMdClose
        className="no-drag h-4.5 w-4.5 cursor-pointer"
        onClick={onQuit}
      />
    </div>
  );
}

const Topbar = () => {
  const [os, setOS] = useState<string>("");

  useEffect(() => {
    const getOS = async () => {
      const operatingSystem = await window.api.info.getOS();
      setOS(operatingSystem);
    };

    getOS();
  }, []);

  const handleMinimize = async () => await window.api.app.minimize();
  const handleQuit = async () => await window.api.app.quit();

  return (
    <div
      className={cn(
        "drag absolute left-0 top-0 z-50 flex h-10 w-full select-none items-center justify-between border-b border-[#353535] bg-[#1f1f1f96] p-2 px-3 text-foreground-50",
        { "flex-row-reverse": os !== "darwin" },
      )}
    >
      {os !== "darwin" ? (
        <>
          <WindowsDisplay onMinimize={handleMinimize} onQuit={handleQuit} />
          <div className="no-drag flex items-center gap-2">
            <h3 className="text-sm font-medium">Fetchflix</h3>
            <ExternalURL className="cursor-pointer" href={config.github}>
              <FaGithub className="h-4 w-4" />
            </ExternalURL>
          </div>
        </>
      ) : (
        <>
          <MacOSDisplay onMinimize={handleMinimize} onQuit={handleQuit} />
          <div className="no-drag flex items-center gap-2">
            <h3 className="text-sm font-medium">Fetchflix</h3>
            <ExternalURL className="cursor-pointer" href={config.github}>
              <FaGithub className="h-4 w-4" />
            </ExternalURL>
          </div>
        </>
      )}
    </div>
  );
};

export default Topbar;
