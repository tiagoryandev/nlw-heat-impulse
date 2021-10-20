import http from "http";
import cors from "cors";
import express from "express";
import SocketIO from "socket.io";
import router from "./routes";
import socket from "./socket";

const app = express();
const Server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const io = new SocketIO.Server(Server, {
    cors: {
        origin: "*"
    }
});

socket(io);

export { Server, io };