import LinkInput from "./components/LinkInput";
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <>
      <h3 className="text-lg text-red-500">hello</h3>
      <LinkInput />
    </>
  );
}

export default App;
