
import { createServer } from "http";

import socketIo from "socket.io";
import socketIoClient from "socket.io-client";
import { Instrument, InstrumentStatsBroadcastMessage } from "./types";

const PORT = process.env.PORT || 4001;
const BROKER_HOST = process.env.BROKER_HOST || "ws://localhost:8900";


const server = createServer();

const io = socketIo(server);
const brokerSocker = socketIoClient(BROKER_HOST, {
  path: "/clients"
});

brokerSocker.on("instrument-stats", (instrument: InstrumentStatsBroadcastMessage) => {
  console.log("fronend got", instrument);
  io.emit("instrument-stats", instrument);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));