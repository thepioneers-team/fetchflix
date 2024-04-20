import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export default function RemoveOnFinish() {
  const [removeOnFinish, setRemoveOnFinish] = useState<boolean>(false);

  useEffect(() => {
    // TODO: add parsing
    let removeOnFinish = localStorage.getItem("remove-on-finish");
    if (!removeOnFinish) setRemoveOnFinish(false);

    setRemoveOnFinish(removeOnFinish?.toLocaleLowerCase() === "true");
  }, []);

  const updateAction = (selected: boolean) => {
    setRemoveOnFinish(selected);
    localStorage.setItem("remove-on-finish", selected.toString());
  };

  return (
    <div className="flex items-center justify-between  gap-2">
      <p className="w-8/12 text-sm text-zinc-300">
        Once a download is completed it will be automatically deleted from the
        app (the downloaded file will remain)
      </p>
      <Switch checked={removeOnFinish} onValueChange={(e) => updateAction(e)} />
    </div>
  );
}
