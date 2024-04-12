import { useEffect, useState } from "react";
import LinkInput from "./components/LinkInput";
import OptionsBar from "./components/OptionsBar";
import DownloadTable from "./components/download/DownloadTable";
import { Download } from "./types/DownloadTable";
import { DownloadStats } from "./types";

function App(): JSX.Element {
  const [downloads, setDownloads] = useState<Download[]>([]);
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

  return (
    <>
      <LinkInput />
      <OptionsBar />
      <DownloadTable downloads={downloads} />
    </>
  );
}

export default App;
