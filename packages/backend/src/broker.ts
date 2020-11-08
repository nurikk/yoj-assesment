import "reflect-metadata";

import { container } from "tsyringe";
import HttpServer from "./servers/http-server";
import ClientsServer from "./servers/clients-server";

import DataCollector from "./services/data-collector";
import Scheduler from "./services/scheduler";
import StatsProcessor from "./services/stats";
import Db from "./services/db";
import ExchangeClient from "./servers/exchange-client";


const BROKERAGE_APP_PORT = process.env.BROKERAGE_APP_PORT || 8900;
const EXCHANGE_HOST = process.env.EXCHANGE_HOST || `ws://localhost:8901`;

const httpServer = container.resolve(HttpServer);
container.resolve(Db);
container.resolve(DataCollector);
container.resolve(StatsProcessor);
container.resolve(Scheduler);
container.resolve(ClientsServer);
container.resolve(ExchangeClient).connect(EXCHANGE_HOST).then();
httpServer.listen(BROKERAGE_APP_PORT as number);
