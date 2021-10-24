import useSpeedtest from "./hooks/useSpeedtest"

function App() {
  const { downloadTestRunning, uploadTestRunning, data } = useSpeedtest()

  return (
    <div className="App">
      {downloadTestRunning && <div>testing download…</div>}
      {uploadTestRunning && <div>testing upload…</div>}
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
}

export default App;
