import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function RemoveOnFinish() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.removeOnFinish);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("removeOnFinish", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-9/12 text-sm">
        If enabled, the download will be removed from the app but the file will
        remain after a successful download.
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
