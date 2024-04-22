import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function NoMtime() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(settings.noMtime);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("noMtime", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-10/12 text-xs">
        mtime is a filesystem field which stores the last modified time for a
        file. youtube-dl automatically tries to populate this with the value in
        the HTTP Last-Modified header. If you enable this, youtube-dl will not
        try to set this field and it will instead appear as the current download
        timestamp
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
