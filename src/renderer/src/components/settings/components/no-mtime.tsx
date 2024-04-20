import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export default function NoMtime() {
  const [restrict, setRestrict] = useState<boolean>(false);

  useEffect(() => {
    // TODO: add parsing
    let noMtime = localStorage.getItem("no-mtime");
    if (!noMtime) setRestrict(false);

    setRestrict(noMtime?.toLocaleLowerCase() === "true");
  }, []);

  const updateAction = (selected: boolean) => {
    setRestrict(selected);
    localStorage.setItem("no-mtime", selected.toString());
  };

  return (
    <div className="flex items-center justify-between  gap-2">
      <p className="w-8/12 text-sm text-zinc-300">
        mtime is a filesystem field which stores the last modified time for a
        file. youtube-dl automatically tries to populate this with the value in
        the HTTP Last-Modified header. If you enable this, youtube-dl will not
        try to set this field and it will instead appear as the current download
        timestamp.
      </p>
      <Switch checked={restrict} onValueChange={(e) => updateAction(e)} />
    </div>
  );
}
