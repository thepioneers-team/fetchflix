import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function EmbedChapters() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.embedChapters);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("embedChapters", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">Add chapter marks to the video file.</p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
