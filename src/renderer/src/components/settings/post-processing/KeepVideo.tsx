import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function KeepVideo() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.keepVideo);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("keepVideo", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        By default youtube-dl deletes the video file when you are extracting
        audio. If enabled, the video file will be kept
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
