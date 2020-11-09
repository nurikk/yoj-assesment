
import Scheduler from "../services/scheduler";
import { injectable } from "tsyringe";
import io from "socket.io"
import { InstrumentTradingRecord } from "@yoj/common";
import { getRandomArbitrary } from "../utils";
import HttpServer from "./http-server";



const getNewPrice = (instrument: InstrumentTradingRecord) => {
  let { transactedPrice, transactedVolume } = instrument;
  transactedPrice = transactedPrice + getRandomArbitrary(-transactedPrice * 0.05, transactedPrice * 0.05);
  transactedVolume = transactedVolume + getRandomArbitrary(-transactedVolume * 0.05, transactedVolume * 0.05);
  return { ...instrument, transactedPrice, transactedVolume } as InstrumentTradingRecord;
}

@injectable()
export default class ExchangeEmulator {
  private instruments: Map<string, InstrumentTradingRecord>;
  private io: io.Server;

  constructor(private scheduler: Scheduler, private httpServer: HttpServer) {
    this.instruments = new Map<string, InstrumentTradingRecord>();
    this.io = io();
    this.io.on("connection", (socket) => socket.on("subscribe", this.handleSubscribtion))
    this.httpServer.registerWebsoketServer(this.io);
    this.scheduler.schedule(this.generateAndPublishNewData, 1000);
  }

  private handleSubscribtion = (name: string): void => {
    console.log("handleSubscribtion", name);
    if (!this.instruments.has(name)) {
      this.instruments.set(name, {
        name,
        transactedPrice: 1,
        transactedVolume: 10,
        timestamp: new Date()
      });
    };
  }
  private generateAndPublishNewData = (): void => {
    this.instruments.forEach((instrument, name) => {
      const updated = getNewPrice(instrument);
      this.io.emit('exchangeData', updated);
      this.instruments.set(name, updated);
    });
  }

}