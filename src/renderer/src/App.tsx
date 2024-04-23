import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import LinkInput from "./components/LinkInput";
import LogViewer from "./components/LogViewer";
import OptionsBar from "./components/OptionsBar";
import PlaylistManager from "./components/PlaylistManager";
import DownloadTable from "./components/download/DownloadTable";
import { useDownload } from "./stores/download";
import { DownloadStats } from "./types";
import { Download } from "./types/DownloadTable";

function App(): JSX.Element {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [version, setVersion] = useState<string>("");
  const { event, resetEvent } = useDownload();

  useEffect(() => {
    window.electron.ipcRenderer.on(
      "download-stats",
      (_, args: DownloadStats) => {
        const { download_stats, id, video_info } = args;

        const index = downloads.findIndex((x) => x.id === args.id);

        const statistics = {
          eta: download_stats.eta,
          id,
          progress: download_stats.percent,
          rate: download_stats.rate,
          size: download_stats.bytes,
          status: video_info.status,
          thumbnail: video_info.thumbnail,
          title: video_info.title,
          url: video_info.url,
        };

        if (index !== -1) {
          let array = [...downloads];
          array[index] = statistics;

          setDownloads(array);
        } else {
          setDownloads([statistics, ...downloads]);
        }
      },
    );

    const getVersion = async () => {
      const version = await window.electron.ipcRenderer.invoke("get-version");
      setVersion(version);
    };

    getVersion();

    return () => {
      window.electron.ipcRenderer.removeAllListeners("download-stats");
    };
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on("update_downloaded", () => {
      const confirm = window.confirm("Update downloaded. Restart to apply?");
      if (confirm) {
        window.electron.ipcRenderer.send("restart_app");
      }
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners("update_downloaded");
    };
  }, []);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case "REMOVE_DOWNLOAD":
          const { id } = event.payload as { id: string };

          setDownloads(downloads.filter((x) => x.id !== id));
          resetEvent();
          break;
      }
    }
  }, [event]);

  return (
    <>
      <LinkInput />
      <OptionsBar />
      <DownloadTable downloads={downloads} />
      <LogViewer />
      <PlaylistManager />
      <Toaster position="bottom-right" />
      <div className="fixed bottom-5 left-5 text-sm text-zinc-400">
        v{version}
      </div>
    </>
  );
}

export default App;
