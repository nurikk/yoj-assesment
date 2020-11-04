



import WebSocket, { Server } from 'ws';
import url from "url";

import { createServer, IncomingMessage } from 'http';
import { Server as NetServer, Socket } from "net";
import  MessageBus from '../services/message-bus';
import { singleton } from 'tsyringe';

@singleton()
export default class BrokerServer {

  private server: NetServer;
  private websoketServers: Map<string, Server>;

  constructor(private messageBus: MessageBus) {
    this.server = createServer();
    this.websoketServers = new Map();
    this.server.on('upgrade', this.handleUpgrade);
  }

  private handleUpgrade = (request: IncomingMessage, socket: Socket, head: Buffer) => {
    const { pathname } = url.parse(request.url as string);
    if (pathname && this.websoketServers.has(pathname)) {
      const wss = this.websoketServers.get(pathname) as Server;
      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  }

  public listen(port: number) {
    this.server.listen(port);
  }

  public registerWebsoketServer(path: string, wsServer: Server) {
    this.websoketServers.set(path, wsServer);
  }
}


