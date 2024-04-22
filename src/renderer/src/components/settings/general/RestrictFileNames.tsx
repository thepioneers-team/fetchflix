import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function RestrictFileNames() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.restrictFileNames);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("restrictFileNames", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        Restrict file names to only ASCII characters, and avoid "&" and spaces
        in filename
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
