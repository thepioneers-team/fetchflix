import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function CovertArt() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.covertArt);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("covertArt", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">Use the video thumbnail as album / cover art.</p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
