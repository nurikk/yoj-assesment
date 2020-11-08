import { singleton } from "tsyringe";


import MessageBus from "../services/message-bus";
import { InstrumentStatsBroadcastMessage } from "@yoj/common";
import BrokerServer from "./http-server";
import io from "socket.io";
import Db from "../services/db";
import { Stock } from "../entity/stock";


@singleton()
export default class ClientsServer {
  private io: io.Server;

  constructor(private appServer: BrokerServer, private messageBus: MessageBus, private db: Db) {
    this.io = io({
      path: '/clients',
      serveClient: false,
    });
    this.io.on("connection", this.onClientConnected);
    this.messageBus.on("instrument-stats", this.broadcastStats);

    this.appServer.registerWebsoketServer(this.io);
  }

  private onClientConnected = async (socket: io.Socket) => {
    const stocks = await this.db.getConnection().manager.find(Stock);
    console.log('client connected', stocks);
    socket.emit("avaliable-stocks", stocks);

  }

  private broadcastStats = (stat: InstrumentStatsBroadcastMessage) => {
    const { stockName } = stat;
    console.log('broadcastStats', stockName);
    this.io.emit("instrument-stats", stat);
  }

}

