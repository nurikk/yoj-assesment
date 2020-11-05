import { singleton } from "tsyringe";

import MessageBus from "../services/message-bus";
import { Instrument } from "@yoj/common";
import BrokerServer from "./broker";
import socketIo from "socket.io";
@singleton()
export default class ExchangeListener {
  private io: socketIo.Server;

  constructor(private appServer: BrokerServer, private messageBus: MessageBus) {
    this.io = socketIo({
      path: '/exchange',
      serveClient: false,
    });

    this.io.on('connection', (socket) => {
      socket.on("exchangeData", this.onExchangeMessage);
    });

    this.appServer.registerWebsoketServer(this.io);
  }

  private onExchangeMessage = (instrument: Instrument) => {
    this.messageBus.emit("exchange-instruments", instrument);
  }
}

