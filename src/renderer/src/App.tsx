import { useEffect, useState } from "react";
import LinkInput from "./components/LinkInput";
import OptionsBar from "./components/OptionsBar";
import DownloadTable from "./components/download/DownloadTable";
import { Download } from "./types/DownloadTable";
import { DownloadStats } from "./types";
import LogViewer from "./components/LogViewer";
import { useDownload } from "./stores/download";
import { Toaster } from "sonner";
import PlaylistManager from "./components/PlaylistManager";

function App(): JSX.Element {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const { event, resetEvent } = useDownload();
  // const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  window.electron.ipcRenderer.on("download-stats", (_, args: DownloadStats) => {
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
  });

  useEffect(() => {
    console.log(downloads);
  }, [downloads]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case "REMOVE_DOWNLOAD":
          const { id } = event.payload as { id: string };

          setDownloads(downloads.filter((x) => x.id !== id));
          resetEvent();
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
    </>
  );
}

export default App;
