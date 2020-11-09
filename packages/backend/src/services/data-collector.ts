import { singleton } from "tsyringe";
import { InstrumentTradingRecord } from "@yoj/common";


import MessageBus from "./message-bus";
import Scheduler from "./scheduler";
import { TradeLog } from "../entity/TradeLog";
import Db from "./db";


const PURGE_INTEVAL = 5 * 60 * 1000;
@singleton()
export default class DataCollector {
  private messagesBuffer: InstrumentTradingRecord[];

  constructor(private messageBus: MessageBus,
    private scheduler: Scheduler,
    private db: Db
  ) {
    this.messagesBuffer = [];
    messageBus.on("exchange-instruments", this.saveMessageBuffer);
    this.scheduler.scheduleDefault(this.presistCurrentBuffer);
    this.scheduler.schedule(this.purgeData, PURGE_INTEVAL); //purge data, (free heroku account has 10k rows limit)
  }

  private saveMessageBuffer = (instrument: InstrumentTradingRecord): void => {
    this.messagesBuffer.push(instrument);
  }

  private purgeData = async () => {
    await this.db.getConnection().manager.getRepository(TradeLog).clear();
  }

  public presistCurrentBuffer = async () => {
    console.log("Persisting current buffer");
    await this.db.getConnection().manager.getRepository(TradeLog).save(this.messagesBuffer);
    this.messagesBuffer = [];
  }
}