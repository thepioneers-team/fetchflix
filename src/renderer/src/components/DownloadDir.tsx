import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaFolder } from "react-icons/fa";

const DownloadDir = () => {
  const [downloadDir, setDownloadDir] = useState<string>("~/Downloads");

  const handleDirChange = async () => {
    const data = await window.api.app.changeDirectory();
    setDownloadDir(data.relativePath);
    window.localStorage.setItem("downloadDir", data.absolutePath);
  };

  return (
    <div>
      <Button
        onClick={handleDirChange}
        className="cursor-pointer rounded-xl bg-zinc-800 p-2 px-4 text-primary transition-all hover:bg-zinc-800/40 "
      >
        <span>{downloadDir}</span>
        <FaFolder />
      </Button>
    </div>
  );
};

export default DownloadDir;
