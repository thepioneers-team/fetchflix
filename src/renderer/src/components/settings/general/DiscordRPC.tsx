import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function AllowDiscordRPC() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.allowDiscordRPC);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("allowDiscordRPC", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-9/12 text-sm">
        If enabled, on your discord activity it will show that you are using
        this app. We would appreciate it a lot ❤️
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
