import DownloadTable from "./components/download/DownloadTable";
import LinkInput from "./components/LinkInput";
import OptionsBar from "./components/OptionsBar";
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <>
      <LinkInput />
      <OptionsBar />
      <DownloadTable />
    </>
  );
}

export default App;
