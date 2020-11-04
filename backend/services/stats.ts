import { singleton } from "tsyringe";
import { InstrumentStats, Instrument } from "../../types";
import MessageBus from "./message-bus";
import Scheduler from "./scheduler";


@singleton()
export default class StatsProcessor {
  private avgStats: Map<string, InstrumentStats>;

  constructor(private messageBus: MessageBus, private scheduler: Scheduler) {
    this.avgStats = new Map<string, InstrumentStats>();
    messageBus.on("exchange-instruments", this.calculateIntermidiateStates);
    scheduler.schedule(this.publishAndClearCurrentStats, 5000);
  }
  public publishAndClearCurrentStats = (): void => {
    this.avgStats.forEach((stats, stockName) => {
      console.log("Publishing %s stats", stockName);
      this.messageBus.emit("instrument-stats", {stockName, stats, timestamp: new Date().getTime()});
      this.avgStats.delete(stockName);
    })
  }

  private calculateIntermidiateStates = (instrument: Instrument): void => {
    const { name, transactedPrice, transactedVolume } = instrument;
    const currentStats = this.avgStats.get(name) || {
      openingPrice: transactedPrice,
      closingPrice: 0,
      transactedVolumeTotal: 0
    } as InstrumentStats;

    const transactedVolumeTotal = currentStats.transactedVolumeTotal + transactedVolume;
    this.avgStats.set(name, { ...currentStats, closingPrice: transactedPrice, transactedVolumeTotal });
  }
}