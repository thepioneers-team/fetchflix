import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function CustomPostRenderingCommand() {
  const { settings, updateSetting } = useSettingsStore();

  const [customPostRenderingCommand, setCustomPostRenderingCommand] =
    useState<string>(settings.customPostRenderingCommand);

  const handleChange = (value: string) => {
    setCustomPostRenderingCommand(value);
    updateSetting("customPostRenderingCommand", value);
  };

  return (
    <div>
      <p className="mb-4 text-sm">
        Enter a command to execute after a download successfully completes. You
        can use{" "}
        <span className="rounded-md border bg-white/20 p-1 px-1.5">
          {"{{path}}"}
        </span>{" "}
        to reference the full path of the file that was just downloaded.
      </p>
      <textarea
        value={customPostRenderingCommand || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="h-52 w-full rounded-md border border-zinc-500 bg-transparent p-2 px-2 font-mono text-sm outline-none"
      />
      <p className="mt-2 text-sm">
        <span className="text-red-600">Warning!</span> Anything you enter in
        this box will be executed after each download. If your command(s) are
        invalid, it's possible your downloads will succeed but will be reported
        as failure. Viewing the console/error message may help you figure out
        what's wrong with your command.
      </p>
    </div>
  );
}
