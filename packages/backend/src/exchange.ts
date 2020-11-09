import "reflect-metadata";
import { container } from "tsyringe";
import { createConnection } from "typeorm";
import ExchangeEmulator from "./servers/exchange-emulator";
import HttpServer from "./servers/http-server";
import Scheduler from "./services/scheduler";



const EXCHANGE_APP_PORT = process.env.EXCHANGE_APP_PORT || 8901;
const httpServer = container.resolve(HttpServer);
container.resolve(Scheduler);
container.resolve(ExchangeEmulator);
httpServer.listen(EXCHANGE_APP_PORT as number);


