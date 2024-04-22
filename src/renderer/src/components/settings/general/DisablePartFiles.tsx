import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function DisablePartFiles() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.disablePartFiles);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("disablePartFiles", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        If enabled, do not use part files. Write directly to output files
        instead.
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
