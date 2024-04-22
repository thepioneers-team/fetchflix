import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function SponsorblockRemove() {
  const { settings, updateSetting } = useSettingsStore();

  const [sponsorblockRemove, setSponsorblockRemove] = useState<string>(
    settings.sponsorblockRemove,
  );

  const handleChange = (value: string) => {
    setSponsorblockRemove(value);
    updateSetting("sponsorblockRemove", value);
  };

  return (
    <div>
      <input
        type="text"
        value={sponsorblockRemove || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-12 w-full rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
      <p className="mt-2 text-sm">
        SponsorBlock categories to be removed from the video file, separated by
        commas. (Default if blank: 'all')
      </p>
    </div>
  );
}
