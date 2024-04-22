import { Select, SelectItem } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function ThrottleRate() {
  const { settings, updateSetting } = useSettingsStore();

  const [unit, setUnit] = useState<string>(settings.unit || "byte");

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(value);
    updateSetting("unit", value);
  };

  return (
    <div className="flex items-center justify-between gap-x-10">
      <p className="w-9/12 text-xs">
        Minimum download rate in bytes per second below which throttling is
        assumed and the video data is re-extracted. If set to 0 (or unset), no
        limit is applied
      </p>

      <Select
        size="md"
        selectedKeys={[unit]}
        onChange={handleChange}
        className="max-w-xs"
        variant="faded"
      >
        <SelectItem value="gigabyte" key="gigabyte">
          Gigabyte
        </SelectItem>
        <SelectItem value="megabyte" key="megabyte">
          Megabyte
        </SelectItem>
        <SelectItem value="kilobyte" key="kilobyte">
          Kilobyte
        </SelectItem>
        <SelectItem value="byte" key="byte">
          Byte
        </SelectItem>
      </Select>
    </div>
  );
}
