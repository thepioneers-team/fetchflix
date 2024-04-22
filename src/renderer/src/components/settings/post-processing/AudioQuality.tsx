import { Slider } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function AudioQuality() {
  const { settings, updateSetting } = useSettingsStore();

  const [quality, setQuality] = useState<number>(
    Number(settings.audioQuality) || 0.5,
  );

  const handleChange = (new_quality: number | number[]) => {
    if (Array.isArray(new_quality)) return;

    setQuality(new_quality);
    updateSetting("audioQuality", new_quality);
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <p className="text-xs">
        By default youtube-dl deletes the video file when you are extracting
        audio. If enabled, the video file will be kept
      </p>
      <Slider
        label="Select a value"
        step={1}
        size="sm"
        radius="md"
        maxValue={9}
        minValue={0}
        marks={[
          {
            label: "Best",
            value: 0,
          },
          {
            label: "Default",
            value: 5,
          },
          {
            label: "Bad",
            value: 9,
          },
        ]}
        value={quality}
        onChange={handleChange}
        className="mx-3 max-w-md"
      />
    </div>
  );
}
