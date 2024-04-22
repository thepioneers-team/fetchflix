import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function SplitChapters() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.splitChapters);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("splitChapters", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        Split video into multiple files based on internal chapters.
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
