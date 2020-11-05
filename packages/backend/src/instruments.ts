import data from "./mock-data/instruments.json";
import { Instrument } from "@yoj/common";

export const loadInstruments = (): Instrument[] => data;