import http from "http";
import { Server } from "socket.io";

export class SocketService {
  private io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    this.handleConnection();
  }

  private handleConnection() {
    this.io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  getIoInstance(): Server {
    return this.io;
  }
}
