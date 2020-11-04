






import { createServer, IncomingMessage, Server } from 'http';
import { Server as NetServer, Socket } from "net";
import MessageBus from '../services/message-bus';
import { singleton } from 'tsyringe';

@singleton()
export default class BrokerServer {
  private server: Server;

  constructor(private messageBus: MessageBus) {
    this.server = createServer();
  }


  public listen(port: number) {
    this.server.listen(port);
  }

  public registerWebsoketServer(io: SocketIO.Server) {
    io.attach(this.server);
  }
}


