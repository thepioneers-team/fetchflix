import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function SourceIPAddress() {
  const { settings, updateSetting } = useSettingsStore();

  const [sourceIPAddress, setSourceIPAddress] = useState<string>(
    settings.sourceIPAddress,
  );

  const handleChange = (value: string) => {
    setSourceIPAddress(value);
    updateSetting("sourceIPAddress", value);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-lg">The IP of origin:</p>

      <input
        placeholder="0"
        type="text"
        value={sourceIPAddress || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-12 w-96 rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
    </div>
  );
}
