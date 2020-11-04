import { singleton } from "tsyringe";
import { Server } from "ws";
import { ExchangeMessage, Instrument } from "../../types";
import MessageBus from "../services/message-bus";
import BrokerServer from "./broker";

@singleton()
export default class ExchangeListener {
  private wsServer: Server;

  constructor(private appServer: BrokerServer, private messageBus: MessageBus) {
    this.wsServer = new Server({ noServer: true });
    // this.wsServer.on("message", this.onExchangeMessage);
    this.wsServer.on('connection', (ws) => {
      ws.on("message", this.onExchangeMessage);
    });

    this.appServer.registerWebsoketServer("/exchange", this.wsServer);
  }

  private onExchangeMessage = (message: string) => {
    const parsedMessage = JSON.parse(message) as ExchangeMessage<unknown>;
    if (parsedMessage.type === "exchangeData") {
      this.messageBus.emit("exchange-instruments", (parsedMessage as ExchangeMessage<Instrument>).payload);
    }
  }
}

