import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function PreferInsecure() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.preferInsecure);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("preferInsecure", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-10/12 text-xs">
        Use an unencrypted connection to retrieve information about the video.
        (Currently only available for YouTube){" "}
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
