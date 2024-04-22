import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function CustomUserAgent() {
  const { settings, updateSetting } = useSettingsStore();

  const [customUserAgent, setCustomUserAgent] = useState<string>(
    settings.customUserAgent,
  );

  const handleChange = (value: string) => {
    setCustomUserAgent(value);
    updateSetting("customUserAgent", value);
  };

  return (
    <input
      type="text"
      value={customUserAgent || ""}
      onChange={(e) => handleChange(e.target.value)}
      className="h-12 w-full rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
    />
  );
}
