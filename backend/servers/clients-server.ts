import { singleton } from "tsyringe";
import WebSocket, { Server } from "ws";
import { ExchangeMessage, Instrument, InstrumentStats, InstrumentStatsBroadcastMessage } from "../../types";
import MessageBus from "../services/message-bus";
import BrokerServer from "./broker";

@singleton()
export default class ClientsServer {
  private wsServer: Server;

  constructor(private appServer: BrokerServer, private messageBus: MessageBus) {
    this.wsServer = new Server({ noServer: true });
    this.appServer.registerWebsoketServer("/clients", this.wsServer);
    this.messageBus.on("instrument-stats", this.broadcastStats);
  }

  private broadcastStats = (stat: InstrumentStatsBroadcastMessage) => {
    const { stockName } = stat;
    console.log('broadcastStats', stockName);
    this.wsServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(stat));
      }
    });
  }

}

