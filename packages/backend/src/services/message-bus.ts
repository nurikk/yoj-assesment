import { singleton } from "tsyringe";

import { EventEmitter } from "events";
import { Instrument, InstrumentStatsBroadcastMessage } from "@yoj/common";




export default interface MessageBus {
  on(event: 'exchange-instruments', listener: (instrument: Instrument) => void): this;
  emit(event: 'exchange-instruments', instrument: Instrument): boolean;

  on(event: 'instrument-stats', listener: (stats: InstrumentStatsBroadcastMessage) => void): this;
  emit(event: 'instrument-stats', stats: InstrumentStatsBroadcastMessage): boolean;
}



@singleton()
export default class MessageBus extends EventEmitter {
}

