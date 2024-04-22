import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function SocketTimeout() {
  const { settings, updateSetting } = useSettingsStore();

  const [socketTimeout, setSocketTimeout] = useState<string>(
    settings.socketTimeout,
  );

  const handleChange = (value: string) => {
    setSocketTimeout(value);
    updateSetting("socketTimeout", value);
  };

  return (
    <div className="flex items-center justify-between">
      <p>Time to wait before giving up, in seconds</p>

      <input
        placeholder="0"
        type="text"
        value={socketTimeout || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-12 w-20 rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
    </div>
  );
}
