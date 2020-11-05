import "reflect-metadata";
import { container } from "tsyringe";
import ExchangeEmulator from "./servers/exchange-emulator";
import Scheduler from "./services/scheduler";


const APP_HOST = process.env.APP_HOST || `ws://localhost:8900`;

container.resolve(Scheduler);
container.resolve(ExchangeEmulator).start(APP_HOST, 1000);
