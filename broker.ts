import "reflect-metadata";

import { container } from "tsyringe";
import BrokerServer from "./backend/servers/broker";
import ExchangeListener from "./backend/servers/exchange-listener";
import DataCollector from "./backend/services/data-collector";
import StatsProcessor from "./backend/services/stats";
import Scheduler from "./backend/services/scheduler";
import ClientsServer from "./backend/servers/clients-server";

const BROKERAGE_APP_PORT = process.env.BROKERAGE_APP_PORT || 8900;

const brokerServer = container.resolve(BrokerServer);
container.resolve(ExchangeListener);
container.resolve(DataCollector);
container.resolve(StatsProcessor);
container.resolve(Scheduler);
container.resolve(ClientsServer);

brokerServer.listen(BROKERAGE_APP_PORT as number);
