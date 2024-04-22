import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function RefererURL() {
  const { settings, updateSetting } = useSettingsStore();

  const [refererUrl, setRefererUrl] = useState<string>(settings.refererUrl);

  const handleChange = (value: string) => {
    setRefererUrl(value);
    updateSetting("refererUrl", value);
  };

  return (
    <input
      type="text"
      value={refererUrl || ""}
      onChange={(e) => handleChange(e.target.value)}
      className="h-12 w-full rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
    />
  );
}
