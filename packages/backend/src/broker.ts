import "reflect-metadata";

import { container } from "tsyringe";
import BrokerServer from "./servers/broker";
import ClientsServer from "./servers/clients-server";
import ExchangeListener from "./servers/exchange-listener";
import DataCollector from "./services/data-collector";
import Scheduler from "./services/scheduler";
import StatsProcessor from "./services/stats";


const BROKERAGE_APP_PORT = process.env.BROKERAGE_APP_PORT || 8900;

const brokerServer = container.resolve(BrokerServer);
container.resolve(ExchangeListener);
container.resolve(DataCollector);
container.resolve(StatsProcessor);
container.resolve(Scheduler);
container.resolve(ClientsServer);

brokerServer.listen(BROKERAGE_APP_PORT as number);
