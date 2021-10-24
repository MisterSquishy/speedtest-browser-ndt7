import { useCallback, useEffect, useRef, useState } from 'react'
import ndt7 from '@m-lab/ndt7';

function App() {
  const resultsRef = useRef([])
  const [mostRecentDatapoint, setMostRecentDatapoint] = useState()
  const test = useCallback(async () => {
    const downloadWorker = await fetch("ndt7-download-worker.min.js").then(resp => resp.text())
    const uploadWorker = await fetch("ndt7-upload-worker.min.js").then(resp => resp.text())
    ndt7.test(
      {
        userAcceptedDataPolicy: true,
        downloadworkerfile: URL.createObjectURL(new Blob([downloadWorker])),
        uploadworkerfile: URL.createObjectURL(new Blob([uploadWorker]))
      },
      {
        serverChosen: function (server) {
          console.log('Testing to:', {
            machine: server.machine,
            locations: server.location,
          });
        },
        downloadComplete: function (data) {
          // (bytes/second) * (bits/byte) / (megabits/bit) = Mbps
          if (data.LastServerMeasurement) {
            const serverBw = data.LastServerMeasurement.BBRInfo.BW * 8 / 1000000;
            const clientGoodput = data.LastClientMeasurement.MeanClientMbps;
            console.log(
              `Download test is complete:
  Instantaneous server bottleneck bandwidth estimate: ${serverBw} Mbps
  Mean client goodput: ${clientGoodput} Mbps`);
            resultsRef.current = [data, ...resultsRef.current]
            setMostRecentDatapoint(Date.now())
          }
        },
        uploadComplete: function (data) {
          // bytes * (bits/byte() * (megabits/bit) * (1/seconds) = Mbps
          if (data.LastServerMeasurement) {
            const serverBw =
              data.LastServerMeasurement.TCPInfo.BytesReceived * 8 / 1000000 / 10;
            const clientGoodput = data.LastClientMeasurement.MeanClientMbps;
            console.log(
              `Upload test is complete:
  Mean server throughput: ${serverBw} Mbps
  Mean client goodput: ${clientGoodput} Mbps`);
            resultsRef.current = [data, ...resultsRef.current]
            setMostRecentDatapoint(Date.now())
          }
        },
        error: function (err) {
          console.error('Error while running the test:', err.message);
        },
      })
  }, [resultsRef])

  useEffect(() => {
    test()
    setInterval(test, 30000)
  }, [test])

  return (
    <div className="App">
      <div>
        {mostRecentDatapoint && `Most recent completed test: ${new Date(mostRecentDatapoint).toLocaleTimeString()}`}
      </div>
      <div>
        {JSON.stringify(resultsRef.current, null, 2)}
      </div>
    </div>
  );
}

export default App;
