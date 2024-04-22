import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function Subtitles() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.subtitles);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("subtitles", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">Write subtitles to a file.</p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
