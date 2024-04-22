import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function RateLimit() {
  const { settings, updateSetting } = useSettingsStore();

  const [rateLimit, setRateLimit] = useState<string>(settings.rateLimit);

  const handleChange = (value: string) => {
    setRateLimit(value);
    updateSetting("rateLimit", value);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs">
        Maximum number of bytes per second. If set to 0 (or unset), no limit is
        applied
      </p>

      <input
        placeholder="0"
        type="text"
        value={rateLimit || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-12 w-32 rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
    </div>
  );
}
