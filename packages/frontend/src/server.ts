
import { createServer } from "http";
import express from "express";


import socketIo from "socket.io";
import socketIoClient from "socket.io-client";
import { InstrumentStatsBroadcastMessage } from "@yoj/common";

const PORT = process.env.PORT || 4001;
const BROKER_HOST = process.env.BROKER_HOST || "ws://localhost:8900";

const app = express();
app.use(express.static('./build'));
app.set("port", PORT);
const server = createServer(app);

const io = socketIo(server);

const brokerSocker = socketIoClient(BROKER_HOST, {
  path: "/clients"
});

brokerSocker.on("instrument-stats", (instrument: InstrumentStatsBroadcastMessage) => {
  console.log("fronend got", instrument);
  io.emit("instrument-stats", instrument);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


