import { useCallback, useEffect } from 'react'
import ndt7 from '@m-lab/ndt7'
import logo from './logo.svg';
import './App.css';

function App() {
  const test = useCallback(() => {
    ndt7.test(
      { 
        userAcceptedDataPolicy: true 
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
          } else {
            console.log({ data })
          }
        },
        error: function (err) {
          console.error('Error while running the test:', err.message);
        },
      })
  }, [])

  useEffect(() => {
    test()
    setInterval(test, 5000)
  }, [test])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
