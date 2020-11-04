import { singleton } from "tsyringe";
import { ExchangeMessage, Instrument } from "../../types";
import MessageBus from "../services/message-bus";
import BrokerServer from "./broker";

@singleton()
export default class ExchangeListener {
  private io: SocketIO.Server;

  constructor(private appServer: BrokerServer, private messageBus: MessageBus) {
    this.io = require('socket.io')({
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

