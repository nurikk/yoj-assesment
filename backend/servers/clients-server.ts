import { singleton } from "tsyringe";

import { InstrumentStatsBroadcastMessage } from "../../types";
import MessageBus from "../services/message-bus";
import BrokerServer from "./broker";

@singleton()
export default class ClientsServer {
  private io: SocketIO.Server;

  constructor(private appServer: BrokerServer, private messageBus: MessageBus) {
    this.io = require('socket.io')({
      path: '/clients',
      serveClient: false,
    });

    this.appServer.registerWebsoketServer(this.io);
    this.messageBus.on("instrument-stats", this.broadcastStats);
  }

  private broadcastStats = (stat: InstrumentStatsBroadcastMessage) => {
    const { stockName } = stat;
    console.log('broadcastStats', stockName);
    this.io.emit("instrument-stats", stat);
    // this.wsServer.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(stat));
    //   }
    // });
  }

}

