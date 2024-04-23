import { useState } from "react";
import { formattingOptions } from "./constants";
import useSettingsStore from "@renderer/stores/settings";

export default function OutputFilenameFormat() {
  const { settings, updateSetting } = useSettingsStore();

  const [outputFilenameFormat, setOutputFilenameFormat] = useState<string>(
    settings.outputTemplate,
  );

  const handleChange = (value: string) => {
    setOutputFilenameFormat(value);
    updateSetting("outputTemplate", value);
  };

  const formatUpdate = (format: string) => {
    setOutputFilenameFormat(`${outputFilenameFormat}%(${format})s`);
    updateSetting("outputTemplate", `${outputFilenameFormat}%(${format})s`);
  };

  return (
    <div>
      <input
        placeholder="Format"
        type="text"
        value={outputFilenameFormat || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-12 w-full flex-grow rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
      <div className="mt-2 flex h-40 w-full flex-wrap gap-3 overflow-y-scroll rounded-md border border-zinc-500 p-4">
        {formattingOptions.map((item) => (
          <p
            key={item.placeholder}
            className="inline-flex cursor-pointer select-none items-center gap-1 rounded-md px-3 py-1 text-sm"
            onClick={() => formatUpdate(item.placeholder)}
            style={{ backgroundColor: item.color }}
          >
            <span className="text-xs underline">{item.type}.</span>
            {item.placeholder}
          </p>
        ))}
      </div>
    </div>
  );
}
