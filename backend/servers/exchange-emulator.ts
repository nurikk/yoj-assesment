


import WebSocket from "ws";
import ReconnectingWebSocket from 'reconnecting-websocket';
import { loadInstruments } from "../instruments";
import { Instrument, ExchangeMessage } from "../../types";
import { getRandomArbitrary } from "../../utils";
import Scheduler from "../services/scheduler";
import { injectable, singleton } from "tsyringe";



const getNewPrice = (instrument: Instrument) => {
  let { transactedPrice, transactedVolume } = instrument;
  transactedPrice = transactedPrice + getRandomArbitrary(-transactedPrice * 0.05, transactedPrice * 0.05);
  transactedVolume = transactedVolume + getRandomArbitrary(-transactedVolume * 0.05, transactedVolume * 0.05);
  return { ...instrument, transactedPrice, transactedVolume } as Instrument;
}

@singleton()
export default class ExchangeEmulator {
  private instruments: Instrument[];
  private rws!: ReconnectingWebSocket;

  constructor(private scheduler: Scheduler) {
    this.instruments = loadInstruments();
  }

  private generateAndPublishNewData = (): void => {
    this.instruments = this.instruments.map(getNewPrice);
    this.instruments.forEach(instrument => {

      const message: ExchangeMessage<Instrument> = {
        "type": "exchangeData",
        "timestamp": new Date().getTime(),
        "payload": instrument
      };
      this.rws.send(JSON.stringify(message));
    })

  }


  public start(appHost: string, updateRate: number): void {
    this.rws = new ReconnectingWebSocket(appHost, [], { WebSocket });
    this.scheduler.schedule(this.generateAndPublishNewData, updateRate);

  }
}