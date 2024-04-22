import { Select, SelectItem } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function BuildChannel() {
  const { settings, updateSetting } = useSettingsStore();

  const [buildChannel, setBuildChannel] = useState<string>(
    settings.buildChannel || "default",
  );

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setBuildChannel(value);
    updateSetting("buildChannel", value);
  };

  return (
    <div className="flex items-center justify-between gap-x-10">
      <p className="w-9/12 text-xs">
        Specify the build channel for yt-dlp. If set to default, --update will
        be used. Others will use --update-to
        {"<channel>"}
      </p>

      <Select
        size="md"
        selectedKeys={[buildChannel]}
        onChange={handleChange}
        className="max-w-xs"
        variant="faded"
      >
        <SelectItem value="default" key="default">
          Default
        </SelectItem>
        <SelectItem value="stable" key="stable">
          Stable
        </SelectItem>
        <SelectItem value="nightly" key="nightly">
          Nightly
        </SelectItem>
        <SelectItem value="master" key="master">
          Master
        </SelectItem>
      </Select>
    </div>
  );
}
