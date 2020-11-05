import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

import './App.css';
import { InstrumentStatsBroadcastMessage } from '@yoj/common';
const ENDPOINT = `http://${document.location.hostname}:${document.location.port}/`;

function App() {
  const [response, setResponse] = useState<InstrumentStatsBroadcastMessage[]>([]);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("instrument-stats", (statMessage: InstrumentStatsBroadcastMessage) => {
      setResponse(oldData => [...oldData, statMessage]);
    });
  }, []);
  return <div>{response.map(resp => <div key={`${resp.timestamp}${resp.stockName}`}>{resp.stockName}</div>)}</div>
}
export default App;
