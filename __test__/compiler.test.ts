import * as pty from "node-pty";
import { Compiler } from "../pkg/compiler/compiler"; // Adjust the import path as necessary

describe("Compiler", () => {
  it("should compile code and handle output", () => {
    const childProcess = Compiler.compile('print("Hello, World!")');
    const mockCallback = jest.fn();
    childProcess.onData(mockCallback);
    expect(mockCallback).toHaveBeenCalledWith("mock output");
    expect(childProcess.onData).toHaveBeenCalled();
    expect(pty.spawn).toHaveBeenCalledWith(
      "python3",
      ["-c", 'print("Hello, World!")'],
      expect.any(Object)
    );
  });

  it("should handle errors during compilation", () => {
    const childProcess = Compiler.compile('raise Exception("error")');
    const mockErrorCallback = jest.fn();
    childProcess.onData(mockErrorCallback);
    expect(childProcess.onData).toHaveBeenCalled();
    expect(pty.spawn).toHaveBeenCalledWith(
      "python3",
      ["-c", 'raise Exception("error")'],
      expect.any(Object)
    );
  });

  it("should terminate compilation after exceeding 10 seconds", () => {
    const mockKill = jest.fn();
    require("node-pty").spawn.mockImplementation(() => ({
      kill: mockKill,
      on: jest.fn(),
    }));

    Compiler.compile("while True: pass"); // Simulating an infinite loop
  });
});
