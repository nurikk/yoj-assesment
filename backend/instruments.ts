
import { Instrument } from "../types";
import data from "./mock-data/instruments.json";

export const loadInstruments = (): Instrument[] => {

  return data;
}