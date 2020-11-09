import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

import './App.css';
import { InstrumentTradingRecord, InstrumentStatsBroadcastMessage } from '@yoj/common';
import Tabs from './components/tabs';
import Tab from './components/tabs/Tab';
import StocksTable from './components/stocks-table/Stoks';

function getSorter<T, K extends keyof T>(column: K) {
  return function (a: T, b: T) {
    if (a[column] < b[column]) {
      return -1
    }
    return a[column] > b[column] ? 1 : 0;
  }
}

function App() {
  const [stocks, setStocks] = useState<InstrumentTradingRecord[]>([]);
  const [stocksStatistics, setStocksStatistics] = useState<InstrumentStatsBroadcastMessage[]>([]);

  useEffect(() => {
    const socket = io({
      path: "/clients"
    });

    socket.io.on('connection', (socket: SocketIOClient.Socket) => {
      console.log(socket);
    });
    socket.on("avaliable-stocks", (data: InstrumentTradingRecord[]) => {
      setStocks(data);
    })

    socket.on("instrument-stats", (statMessage: InstrumentStatsBroadcastMessage) => {
      setStocksStatistics(oldData => [...oldData, statMessage]);
    });
  }, []);

  return (
    <Tabs>
      {stocks.map(stock =>
        <Tab key={stock.name} title={stock.name}>
          <StocksTable data={
            stocksStatistics.filter(stat => stat.stockName === stock.name).sort(getSorter("timestamp")).reverse()
          } />
        </Tab>
      )}
    </Tabs>
  )


}
export default App;
