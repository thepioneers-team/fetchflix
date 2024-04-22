import { Radio, RadioGroup } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function ForceIPVersion() {
  const { settings, updateSetting } = useSettingsStore();

  const [forceIPVersion, setForceIPVersion] = useState<string>(
    settings.forceIPVersion || "no-force",
  );

  const handleChange = (value: string) => {
    setForceIPVersion(value);
    updateSetting("forceIPVersion", value);
  };

  return (
    <div className="flex flex-col justify-between gap-y-5">
      <p>Make all connections via IPv4 or IPv6</p>

      <RadioGroup
        value={forceIPVersion}
        onValueChange={handleChange}
        orientation="horizontal"
      >
        <Radio value="no-force" className="mr-1">
          <span className="text-white">No Force</span>
        </Radio>
        <Radio value="ipv4" className="mr-1">
          <span className="text-white">IPv4</span>
        </Radio>
        <Radio value="ipv6" className="mr-1">
          <span className="text-white">IPv6</span>
        </Radio>
      </RadioGroup>
    </div>
  );
}
