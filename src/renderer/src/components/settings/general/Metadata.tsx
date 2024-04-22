import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function Metadata() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.metadata);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("metadata", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">Write video metadata to a .info.json file</p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
