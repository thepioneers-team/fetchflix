import { Log, useLogs } from "@renderer/stores/logs";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function LogViewer() {
  const { data, resetData } = useLogs();
  const [logs, setLogs] = useState<Array<string>>([]);

  // Properly setup and clean up the IPC event listener
  useEffect(() => {
    const handleDownloadLogs = (_, newLogs: Log) => {
      if (newLogs.id === data?.id) {
        setLogs(newLogs.logs);
      }
    };

    window.electron.ipcRenderer.on("download-logs", handleDownloadLogs);

    return () => {
      window.electron.ipcRenderer.removeAllListeners("download-logs");
    };
  }, [data?.id]); // Dependency on `data.id` if it's expected to change over time

  // Fetch logs with dependencies correctly specified
  const fetchLogs = useCallback(async () => {
    if (data?.id) {
      try {
        const logHistory = await window.electron.ipcRenderer.invoke(
          "get-logs",
          data.id,
        );
        setLogs((prevLogs) => [...logHistory, ...prevLogs]);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
        setLogs([]);
      }
    }
  }, [data?.id]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const close = useCallback(() => {
    setLogs([]);
    resetData();
  }, [resetData]);

  if (!data) return null;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-end justify-end bg-black/50"
      onClick={close}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ translateY: 25 }}
        animate={{ translateY: 0 }}
        className="relative flex h-72 w-full flex-col gap-y-2 overflow-y-scroll rounded-t-lg bg-[#272727] p-5 font-mono"
      >
        <div className="absolute right-4 top-4">
          <IoMdClose className="h-5 w-5 cursor-pointer" onClick={close} />
        </div>
        {logs
          .filter((x) => x !== "")
          .map((log, index) => (
            <span key={index} className="text-sm">
              {log}
            </span>
          ))}
      </motion.div>
    </div>
  );
}
