jest.mock("node-pty", () => ({
  spawn: jest.fn().mockImplementation((command, args, options) => {
    const isError = args.includes("error"); // Simple condition to trigger error
    const onData = jest.fn().mockImplementation((callback) => {
      if (isError) {
        callback("error output"); // Simulate error output
      } else {
        callback("mock output"); // Simulate normal output
      }
      return this;
    });
    const onError = jest.fn().mockImplementation((callback) => {
      if (isError) {
        callback("An error occurred"); // Simulate error callback
      }
      return this;
    });
    return {
      onData,
      onError,
      write: jest.fn(),
      kill: jest.fn(),
    };
  }),
}));
