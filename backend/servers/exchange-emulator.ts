


import { loadInstruments } from "../instruments";
import { Instrument, ExchangeMessage } from "../../types";
import { getRandomArbitrary } from "../../utils";
import Scheduler from "../services/scheduler";
import { injectable } from "tsyringe";
import io from "socket.io-client"


const getNewPrice = (instrument: Instrument) => {
  let { transactedPrice, transactedVolume } = instrument;
  transactedPrice = transactedPrice + getRandomArbitrary(-transactedPrice * 0.05, transactedPrice * 0.05);
  transactedVolume = transactedVolume + getRandomArbitrary(-transactedVolume * 0.05, transactedVolume * 0.05);
  return { ...instrument, transactedPrice, transactedVolume } as Instrument;
}

@injectable()
export default class ExchangeEmulator {
  private instruments: Instrument[];
  private socket!: SocketIOClient.Socket;

  constructor(private scheduler: Scheduler) {
    this.instruments = loadInstruments();
  }

  private generateAndPublishNewData = (): void => {
    this.instruments = this.instruments.map(getNewPrice);
    this.instruments.forEach(instrument => {
      this.socket.emit('exchangeData', instrument)
    });
  }


  public start(appHost: string, updateRate: number): void {
    this.socket = io(appHost, {
      path: '/exchange'
    });
    this.scheduler.schedule(this.generateAndPublishNewData, updateRate);
  }
}