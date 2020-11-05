import { singleton } from "tsyringe";
import { Instrument } from "@yoj/common";


import MessageBus from "./message-bus";
import Scheduler from "./scheduler";


@singleton()
export default class DataCollector {
  private messagesBuffer: Map<string, Instrument[]>;

  constructor(private messageBus: MessageBus, private scheduler: Scheduler) {
    this.messagesBuffer = new Map<string, Instrument[]>();
    messageBus.on("exchange-instruments", this.saveMessageBuffer);
    this.scheduler.scheduleDefault(this.presistCurrentBuffer);
  }

  private saveMessageBuffer = (instrument: Instrument): void => {
    const { name } = instrument;
    if (this.messagesBuffer.has(name)) {
      this.messagesBuffer.get(name)?.push(instrument);
    } else {
      this.messagesBuffer.set(name, [instrument]);
    }
  }

  public presistCurrentBuffer = (): void => {
    console.log("Persisting current buffer");
  }
}