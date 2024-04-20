import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export default function DisablePartFile() {
  const [restrict, setRestrict] = useState<boolean>(false);

  useEffect(() => {
    // TODO: add parsing
    let disablePartFile = localStorage.getItem("disable-part-file");
    if (!disablePartFile) setRestrict(false);

    setRestrict(disablePartFile?.toLocaleLowerCase() === "true");
  }, []);

  const updateAction = (selected: boolean) => {
    setRestrict(selected);
    localStorage.setItem("disable-part-file", selected.toString());
  };

  return (
    <div className="flex items-center justify-between  gap-2">
      <p className="w-8/12 text-sm text-zinc-300">
        If enabled, do not use part files. Write directly to output files
        instead.
      </p>
      <Switch checked={restrict} onValueChange={(e) => updateAction(e)} />
    </div>
  );
}
