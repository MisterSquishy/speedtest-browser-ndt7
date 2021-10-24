import { useCallback, useEffect, useRef, useState } from 'react'
import ndt7 from '@m-lab/ndt7';

const useSpeedtest = () => {
  const resultsRef = useRef([])
  const [downloadTestRunning, setDownloadTestRunning] = useState()
  const [uploadTestRunning, setUploadTestRunning] = useState()
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
        serverDiscovery: function () {
          setDownloadTestRunning(true)
          setUploadTestRunning(true)
        },
        serverChosen: function (server) {
          console.log('Testing to:', {
            machine: server.machine,
            locations: server.location,
          });
        },
        downloadComplete: function (data) {
          if (data.LastServerMeasurement) {
            const goodput = data.LastClientMeasurement.MeanClientMbps;
            const res = {
              type: "download",
              completionTime: Date.now(),
              goodput,
              data,
            }
            resultsRef.current = [res, ...resultsRef.current]
            setDownloadTestRunning(false)
          }
        },
        uploadComplete: function (data) {
          if (data.LastServerMeasurement) {
            const goodput = data.LastClientMeasurement.MeanClientMbps;
            const res = {
              type: "upload",
              completionTime: Date.now(),
              goodput,
              data,
            }
            resultsRef.current = [res, ...resultsRef.current]
            setUploadTestRunning(false)
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

  return {downloadTestRunning, uploadTestRunning, data: resultsRef.current}
}

export default useSpeedtest