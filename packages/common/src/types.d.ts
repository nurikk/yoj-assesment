export type InstrumentStats = {
  openingPrice: number;
  closingPrice: number;
  transactedVolumeTotal: number;
}

export type InstrumentTradingRecord = {
  name: string;
  transactedPrice: number;
  transactedVolume: number;
  timestamp: Date;
}

export type ExchangeMessageType = "exchangeData";



export type ExchangeMessage<T> = {
  "type": ExchangeMessageType,
  "timestamp": number;
  "payload": T;
}


export type InstrumentStatsBroadcastMessage =  {
  stockName: string;
  stats: InstrumentStats,
  timestamp: number;
}


