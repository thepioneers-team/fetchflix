import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function EnableSponsorblock() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.sponsorblock);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("sponsorblock", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        If turned on, the rest of the sponsorblock configuration will be
        applied. If disabled configs are ignored.
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
