import { Button } from '@nextui-org/react'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <h3 className="text-lg text-red-500">hello</h3>
      <Button color="primary">Hello</Button>
    </>
  )
}

export default App
