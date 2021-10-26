import { CartesianGrid, LineChart, XAxis, YAxis, Legend, Tooltip, Line, ReferenceLine } from "recharts"
import Spinner from "react-bootstrap/Spinner"
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
            <CartesianGrid strokeDasharray="3 5" />
            <Tooltip labelFormatter={(val) => new Date(val).toLocaleTimeString()} />
            <XAxis dataKey="timestamp" interval="preserveEnd" tickFormatter={(val) => new Date(val).toLocaleTimeString()} />
            <Legend formatter={(value) => {
              var showSpinner = (value === "Download" && downloadTestRunning) || (value === "Upload" && uploadTestRunning)
              return <span>{value} <Spinner size="sm" style={showSpinner ? {} : { visibility: 'hidden' }} animation="grow" color={value === "Download" ? "#8884d8" : "#ffc658"} /></span>
            }} />

            <YAxis yAxisId="left" interval="preserveEnd" unit="mbps" tick={{ fill: '#8884d8' }} />
            <Line dataKey="download.goodput" strokeWidth="2px" yAxisId="left" connectNulls stroke="#8884d8" dot={{ fill: '#8884d8' }} activeDot={{ r: 6, fill: '#8884d8', stroke: 'white' }} name="Download" />
            <ReferenceLine y={50} yAxisId="left" label={{ position: 'insideLeft', value: "Video streaming", fill: "#8884d8" }} stroke="#8884d8" strokeDasharray="3 2" alwaysShow />
            <ReferenceLine y={70} yAxisId="left" label={{ position: 'insideLeft', value: "Video chat", fill: "#8884d8" }} stroke="#8884d8" strokeDasharray="3 2" alwaysShow />
            <ReferenceLine y={90} yAxisId="left" label={{ position: 'insideLeft', value: "4k streaming", fill: "#8884d8" }} stroke="#8884d8" strokeDasharray="3 2" alwaysShow />

            <YAxis yAxisId="right" orientation="right" interval="preserveEnd" unit="mbps" tick={{ fill: '#ffc658' }} />
            <Line dataKey="upload.goodput" strokeWidth="2px" yAxisId="right" connectNulls stroke="#ffc658" dot={{ fill: '#ffc658' }} activeDot={{ r: 6, fill: '#ffc658', stroke: 'white' }} name="Upload" />
            <ReferenceLine y={1} yAxisId="right" label={{ position: 'insideRight', value: "Video streaming", fill: "#ffc658" }} stroke="#ffc658" strokeDasharray="3 2" alwaysShow />
            <ReferenceLine y={3} yAxisId="right" label={{ position: 'insideRight', value: "Video chat", fill: "#ffc658" }} stroke="#ffc658" strokeDasharray="3 2" alwaysShow />
          </LineChart>
        </div>
      </div>
      <footer style={{ color: '#666666' }}>Tests use M-Lab's NDT-7 network performance measurement protocol: <a target="_blank" rel="noreferrer" href="https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md">https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md</a></footer>
    </div>
  );
}

export default App;
