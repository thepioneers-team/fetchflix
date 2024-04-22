import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function ProxyIPAddress() {
  const { settings, updateSetting } = useSettingsStore();

  const [ipAddress, setIpAddress] = useState<string>(settings.proxyIpAddress);

  const handleChange = (value: string) => {
    setIpAddress(value);
    updateSetting("proxyIpAddress", value);
  };

  return (
    <input
      placeholder="socks5://127.0.0.1:1080"
      type="text"
      value={ipAddress || ""}
      onChange={(e) => handleChange(e.target.value)}
      className="h-12 w-full rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
    />
  );
}
