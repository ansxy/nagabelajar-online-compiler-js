import cors from "cors";
import { Application } from "express";
import http from "http";
import { Config } from "./config/config";
import { SocketEvents } from "./pkg/socket.io/socketEvents";
import { SocketService } from "./pkg/socket.io/socket_io";
export class Server {
  public conf: Config;

  constructor(conf: Config) {
    this.conf = conf;
  }

  public start(app: Application) {
    const server = http.createServer(app);
    app.use(cors());
    const socketServer = new SocketService(server);
    new SocketEvents(socketServer.getIoInstance());
    return server;
  }
}
