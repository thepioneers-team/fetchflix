import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";
import { FaFolder } from "react-icons/fa";

export default function FfmpegLocation() {
  const { settings, updateSetting } = useSettingsStore();

  const [ffmpegLocation, setFfmpegLocation] = useState<string>(
    settings.ffmpegLocation,
  );

  const handleChange = async () => {
    const data = await window.electron.ipcRenderer.invoke(
      "change-ffmpeg-location",
    );

    setFfmpegLocation(data.relativePath);
    updateSetting("ffmpegLocation", data.relativePath);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        disabled
        value={ffmpegLocation}
        className="h-10 w-full cursor-not-allowed rounded-md border border-zinc-500 bg-zinc-300/50 px-2 font-roboto text-sm text-zinc-700 outline-none"
      />
      <div className="cursor-pointer rounded-full border p-2">
        <FaFolder className="h-4 w-4" onClick={handleChange} />
      </div>
    </div>
  );
}
