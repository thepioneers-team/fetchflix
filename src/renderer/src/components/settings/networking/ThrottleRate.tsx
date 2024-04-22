import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function ThrottleRate() {
  const { settings, updateSetting } = useSettingsStore();

  const [throttleRate, setThrottleRate] = useState<string>(
    settings.throttleRate,
  );

  const handleChange = (value: string) => {
    setThrottleRate(value);
    updateSetting("throttleRate", value);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-9/12 text-xs">
        Minimum download rate in bytes per second below which throttling is
        assumed and the video data is re-extracted. If set to 0 (or unset), no
        limit is applied
      </p>

      <input
        placeholder="0"
        type="text"
        value={throttleRate || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-12 w-32 rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
    </div>
  );
}
