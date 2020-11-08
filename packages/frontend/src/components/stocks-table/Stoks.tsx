import { InstrumentStatsBroadcastMessage } from '@yoj/common';
import React from 'react'
import "./Stoks.css";

type Props = {
  data: InstrumentStatsBroadcastMessage[];
}

const DateTime: React.FC<{ ts: number }> = ({ ts }) => {
  const date = new Date(ts);
  return <div>{date.toLocaleTimeString()}</div>;
}

const Fixed: React.FC<{ value: number, decimals?: number }> = ({ value, decimals = 2 }) => {

  return <div>{value.toFixed(decimals)}</div>
}
const StocksTable: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return <div>No data</div>;
  }
  return (
    <table className="stocks-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Open</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map(resp =>
          <tr key={`${resp.timestamp}${resp.stockName}`}>
            <td><DateTime ts={resp.timestamp} /></td>
            <td><Fixed value={resp.stats.openingPrice} /></td>
            <td><Fixed value={resp.stats.closingPrice} /></td>
            <td><Fixed value={resp.stats.transactedVolumeTotal} decimals={1} /></td>
          </tr>)}
      </tbody>
    </table>
  )
}

export default StocksTable;