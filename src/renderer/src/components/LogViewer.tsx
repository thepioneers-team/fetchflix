import { Log, useLogs } from "@renderer/stores/logs";
import { useState } from "react";

import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

// TODO: fetch the logs

export default function LogViewer() {
  const { data, resetData } = useLogs();

  const [logs, setLogs] = useState<Array<string>>([]);

  if (!data) return null;

  window.electron.ipcRenderer.on("download-logs", (_, logs: Log) => {
    if (logs.id === data.id) {
      setLogs(logs.logs);
    }
  });

  const close = () => {
    setLogs([]);
    resetData();
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-end justify-end bg-black/50">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ translateY: 25 }}
        animate={{ translateY: 0 }}
        className="relative flex h-72 w-full flex-col gap-y-2 overflow-y-hidden rounded-t-lg bg-[#272727] p-5 font-mono"
      >
        <div className="absolute right-4 top-4">
          <IoMdClose className="h-5 w-5 cursor-pointer" onClick={close} />
        </div>
        {logs.map((log) => (
          <span className="text-sm">{log}</span>
        ))}
      </motion.div>
    </div>
  );
}
