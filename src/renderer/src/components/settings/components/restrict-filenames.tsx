import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export default function RestrictFileNames() {
  const [restrict, setRestrict] = useState<boolean>(false);

  useEffect(() => {
    // TODO: add parsing
    let restrictFileNames = localStorage.getItem("restrict-file-names");
    if (!restrictFileNames) setRestrict(false);

    setRestrict(restrictFileNames?.toLowerCase() === "true");
  }, []);

  const updateAction = (selected: boolean) => {
    setRestrict(selected);
    localStorage.setItem("restrict-file-names", selected.toString());
  };

  return (
    <div className="flex items-center justify-between  gap-2">
      <p className="w-8/12 text-sm text-zinc-300">
        Restrict filenames to only ASCII characters, and avoid "&" and spaces in
        filenames
      </p>
      <Switch checked={restrict} onValueChange={(e) => updateAction(e)} />
    </div>
  );
}
