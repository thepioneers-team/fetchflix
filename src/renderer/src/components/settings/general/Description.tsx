import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function Description() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.description);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("description", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">Write video description to a .description file</p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
