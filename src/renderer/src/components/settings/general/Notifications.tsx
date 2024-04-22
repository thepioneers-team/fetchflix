import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function Notifications() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.notifications);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("notifications", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-9/12 text-sm">
        If enabled, once a download or playlist fetch is completed and the app
        is out of focus you will be notified.
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
