import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function AllSubtitles() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.allSubtitles);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("allSubtitles", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        Try to download all available subs for the video
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
