import { Server, Socket } from "socket.io";
import { Compiler } from "../compiler/compiler";

export class SocketEvents {
  constructor(private io: Server) {
    this.handleCustomEvent();
  }

  private handleCustomEvent() {
    const nsp = this.io.of("/playground");
    nsp.on("connection", (socket: Socket) => {
      socket.on("message", (msg: string) => {
        console.log(msg);
      });

      socket.on("RunCode", (code: string) => {
        const RunCode = Compiler.compile(code);
        RunCode.onData((data: string) => {
          socket.emit("output", data);
        });
        socket.on("input", (data) => {
          RunCode.write(`${data}`);
        });

        socket.on("disconnect", () => {
          RunCode.kill();
        });
      });
      socket.on("TestCode", (code: string, args: string[]) => {
        const TestCode = Compiler.TestingCode(code);
        TestCode.onData((data: string) => {
          socket.emit("output", data);
        });
        socket.on("input", (data) => {
          TestCode.write(`${data}`);
        });

        socket.on("disconnect", () => {
          TestCode.kill();
        });
      });
    });
  }
}
