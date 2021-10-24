import { CartesianGrid, LineChart, XAxis, YAxis, Legend, Tooltip, Line } from "recharts"
import useSpeedtest from "./hooks/useSpeedtest"

function App() {
  const { downloadTestRunning, uploadTestRunning, data } = useSpeedtest()

  return (
    <div className="App">
      <LineChart width={730} height={250} data={data} key={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" interval="preserveEnd" tickFormatter={(val) => new Date(val).toLocaleTimeString()} />
        <YAxis interval="preserveEnd" unit="mbps" />
        <Tooltip labelFormatter={(val) => new Date(val).toLocaleTimeString()} />
        <Legend />
        <Line dataKey="download.goodput" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line dataKey="upload.goodput" stroke="#82ca9d" />
      </LineChart>
      {downloadTestRunning && <div>testing download…</div>}
      {uploadTestRunning && <div>testing upload…</div>}
      <footer style={{ position: "absolute", top: "95%" }}>Tests use M-Lab's NDT-7 network performance measurement protocol: <a target="_blank" rel="noreferrer" href="https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md">https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md</a></footer>
    </div>
  );
}

export default App;
