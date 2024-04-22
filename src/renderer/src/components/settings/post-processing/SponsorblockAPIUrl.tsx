import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function SponsorblockAPIUrl() {
  const { settings, updateSetting } = useSettingsStore();

  const [sponsorblockAPIUrl, setSponsorblockAPIUrl] = useState<string>(
    settings.sponsorblockAPIUrl,
  );

  const handleChange = (value: string) => {
    setSponsorblockAPIUrl(value);
    updateSetting("sponsorblockAPIUrl", value);
  };

  return (
    <input
      type="text"
      value={sponsorblockAPIUrl || ""}
      onChange={(e) => handleChange(e.target.value)}
      className="h-12 w-full rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
    />
  );
}
