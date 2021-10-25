import { CartesianGrid, LineChart, XAxis, YAxis, Legend, Tooltip, Line, ReferenceLine } from "recharts"
import useSpeedtest from "./hooks/useSpeedtest"

function App() {
  const { downloadTestRunning, uploadTestRunning, data } = useSpeedtest()

  return (
    <div className="App">
      <div style={{ minHeight: 'calc(100vh - 30px)' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ color: '#666666' }}>Internet speed monitor</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LineChart width={1000} height={500} data={data} key={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelFormatter={(val) => new Date(val).toLocaleTimeString()} />
            <XAxis dataKey="timestamp" interval="preserveEnd" tickFormatter={(val) => new Date(val).toLocaleTimeString()} />
            <Legend />

            <YAxis yAxisId="left" interval="preserveEnd" unit="mbps" tick={{ fill: '#8884d8' }} />
            <Line dataKey="download.goodput" yAxisId="left" connectNulls stroke="#8884d8" activeDot={{ r: 8 }} name="Download" />
            <ReferenceLine y={50} yAxisId="left" label={{ position: 'insideLeft', value: "Video streaming", fill: "#8884d8" }} stroke="#8884d8" strokeDasharray="3 2" alwaysShow />
            <ReferenceLine y={70} yAxisId="left" label={{ position: 'insideLeft', value: "Video chat", fill: "#8884d8" }} stroke="#8884d8" strokeDasharray="3 2" alwaysShow />
            <ReferenceLine y={90} yAxisId="left" label={{ position: 'insideLeft', value: "4k streaming", fill: "#8884d8" }} stroke="#8884d8" strokeDasharray="3 2" alwaysShow />

            <YAxis yAxisId="right" orientation="right" interval="preserveEnd" unit="mbps" tick={{ fill: '#ffc658' }} />
            <Line dataKey="upload.goodput" yAxisId="right" connectNulls stroke="#ffc658" activeDot={{ r: 8 }} name="Upload" />
            <ReferenceLine y={1} yAxisId="right" label={{ position: 'insideRight', value: "Video streaming", fill: "#ffc658" }} stroke="#ffc658" strokeDasharray="3 2" alwaysShow />
            <ReferenceLine y={3} yAxisId="right" label={{ position: 'insideRight', value: "Video chat", fill: "#ffc658" }} stroke="#ffc658" strokeDasharray="3 2" alwaysShow />
          </LineChart>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {downloadTestRunning && <div style={{ color: '#666666' }}>…testing download…</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {uploadTestRunning && <div style={{ color: '#666666' }}>…testing upload…</div>}
        </div>
      </div>
      <footer style={{ color: '#666666' }}>Tests use M-Lab's NDT-7 network performance measurement protocol: <a target="_blank" rel="noreferrer" href="https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md">https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md</a></footer>
    </div>
  );
}

export default App;
