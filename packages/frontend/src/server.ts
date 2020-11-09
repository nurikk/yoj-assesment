
import { createServer } from "http";
import express from "express";


import socketIo from "socket.io";
import socketIoClient from "socket.io-client";
import { InstrumentTradingRecord, InstrumentStatsBroadcastMessage } from "@yoj/common";

const PORT = process.env.PORT || 4001;
const BROKER_HOST = process.env.BROKER_HOST || "ws://localhost:8900";

let avaliableStocks: InstrumentTradingRecord[] = [];

const app = express();
app.use(express.static('./build'));
app.set("port", PORT);
const server = createServer(app);

const io = socketIo(server, {
  path: "/clients"
});
//publish avaliableStocks to new client
io.on("connection", (socket) => {
  socket.emit("avaliable-stocks", avaliableStocks);
})

const brokerSocker = socketIoClient(BROKER_HOST, {
  path: '/clients'
});

//broadcast stocks among all connected client
brokerSocker.on("instrument-stats", (instrument: InstrumentStatsBroadcastMessage) => {
  io.emit("instrument-stats", instrument);
});

brokerSocker.on("avaliable-stocks", (stocks: InstrumentTradingRecord[]) => {
  avaliableStocks = stocks;
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


