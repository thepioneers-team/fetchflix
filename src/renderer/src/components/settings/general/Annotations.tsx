import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function Annotations() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.annotations);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("annotations", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">Write annotations to a .xml file</p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
