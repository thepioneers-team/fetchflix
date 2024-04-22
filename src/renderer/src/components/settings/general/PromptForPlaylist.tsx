import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function PromptForPlaylist() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.promptForPlaylist);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("promptForPlaylist", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-9/12 text-sm">
        When disabled, you will not be prompted in order to select options from
        a playlist. All content will be downloaded.
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
