import * as pty from "node-pty";
import path from "path";

const code = `
import sys
def calculate_diameter(radius):
    return 2 * radius
def run_test(input_value, expected_output):
    radius = float(input_value)
    output = calculate_diameter(radius)
    return output == float(expected_output)
if __name__ == "__main__":
    test_case = sys.argv[1].split(',')
    input_value = test_case[0]
    expected_output = test_case[2]
    result = run_test(input_value, expected_output)
    print(result == input_value)
`;

const testCases = ["5", ",", "10.0"];

export class Compiler {
  public static compile(code: string): pty.IPty {
    const child = pty.spawn("python3", ["-c", code], {
      name: "xterm-color",
      cwd: path.join(__dirname, "../../../dump"),
      cols: 80,
      rows: 30,
      handleFlowControl: true,
    });

    const timeout = setTimeout(() => {
      child.kill();
      console.error("Compilation terminated: Time limit exceeded (2 minutes).");
      clearTimeout(timeout);
    }, 1000);

    return child;
  }

  public static TestingCode(code: string): pty.IPty {
    const child = pty.spawn("python3", ["-c", code, testCases.join(",")], {
      name: "xterm-color",
      cwd: path.join(__dirname, "../../dump"),
      cols: 80,
      rows: 30,
      handleFlowControl: true,
    });

    return child;
  }
}
