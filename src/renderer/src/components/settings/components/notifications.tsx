import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export default function Notifications() {
  const [restrict, setRestrict] = useState<boolean>(false);

  useEffect(() => {
    // TODO: add parsing
    let notifications = localStorage.getItem("notifications");
    if (!notifications) setRestrict(false);

    setRestrict(notifications?.toLocaleLowerCase() === "true");
  }, []);

  const updateAction = (selected: boolean) => {
    setRestrict(selected);
    localStorage.setItem("notifications", selected.toString());
  };

  return (
    <div className="flex items-center justify-between  gap-2">
      <p className="w-8/12 text-sm text-zinc-300">
        If enabled, upon a download or process being completed you will be
        notified if the app is not in focus.
      </p>
      <Switch checked={restrict} onValueChange={(e) => updateAction(e)} />
    </div>
  );
}
