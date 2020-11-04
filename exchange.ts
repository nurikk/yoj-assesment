import "reflect-metadata";
import { container } from "tsyringe";

import ExchangeEmulator from "./backend/servers/exchange-emulator";
import Scheduler from "./backend/services/scheduler";

const APP_HOST = process.env.APP_HOST || `ws://localhost:8900`;

container.resolve(Scheduler);
container.resolve(ExchangeEmulator).start(APP_HOST, 1000);
