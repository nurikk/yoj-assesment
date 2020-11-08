import { singleton } from "tsyringe";

import MessageBus from "../services/message-bus";
import { Instrument } from "@yoj/common";

import io from "socket.io-client";
import Db from "../services/db";
import { Stock } from "../entity/stock";
@singleton()
export default class ExchangeClient {
  private io: SocketIOClient.Socket;

  constructor(private messageBus: MessageBus, private db: Db) { }

  public async connect(exchangeHost: string) {
    this.io = io.connect(exchangeHost);

    this.io.on("connect", this.onConnect)
    this.io.on("exchangeData", this.onExchangeData);
  }
  private onConnect = async () => {
    const connection = this.db.getConnection();
    const stocks = await connection.manager.find(Stock);
    stocks.forEach((stock) => {
      console.log("Subscribe", stock.name);
      this.io.emit("subscribe", stock.name);
    });
  }

  private onExchangeData = (instrument: Instrument) => {
    this.messageBus.emit("exchange-instruments", instrument);
  }
}

