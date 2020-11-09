import { singleton } from "tsyringe";

import { EventEmitter } from "events";
import { InstrumentTradingRecord, InstrumentStatsBroadcastMessage } from "@yoj/common";




export default interface MessageBus {
  on(event: 'exchange-instruments', listener: (instrument: InstrumentTradingRecord) => void): this;
  emit(event: 'exchange-instruments', instrument: InstrumentTradingRecord): boolean;

  on(event: 'instrument-stats', listener: (stats: InstrumentStatsBroadcastMessage) => void): this;
  emit(event: 'instrument-stats', stats: InstrumentStatsBroadcastMessage): boolean;
}



@singleton()
export default class MessageBus extends EventEmitter {
}

