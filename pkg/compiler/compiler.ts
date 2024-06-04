import * as pty from "node-pty";
import path from "path";

const pythonCode = `
# Fungsi untuk menerjemahkan kodon menjadi nama protein
def terjemah_protein(kodon):
    # Dictionary untuk tabel terjemahan kodon menjadi protein
    kodon_to_protein = {
        "AUG": "Methionine",
        "UUU": "Phenylalanine", "UUC": "Phenylalanine",
        "UUA": "Leucine", "UUG": "Leucine",
        "UCU": "Serine", "UCC": "Serine", "UCA": "Serine", "UCG": "Serine",
        "UAU": "Tyrosine", "UAC": "Tyrosine",
        "UGU": "Cysteine", "UGC": "Cysteine",
        "UGG": "Tryptophan"
    }
    
    # Mengembalikan nama protein berdasarkan kodon
    return kodon_to_protein.get(kodon, "Kodon tidak dikenal")

# Program utama untuk menerima input dari pengguna
if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    
    try:
        divider_index = args.index("divider")
    except ValueError:
        print("Error: 'divider' not found in the arguments.")
        sys.exit(1)
    
    inputs = args[:divider_index]
    expected_outputs = args[divider_index + 1:]
    
    if len(inputs) != len(expected_outputs):
        print("Error: The number of input codons does not match the number of expected outputs.")
        sys.exit(1)

    results = []
    for i, kodon_input in enumerate(inputs):
        kodon_input = kodon_input.strip().upper()
        expected_output = expected_outputs[i].strip()
        protein = terjemah_protein(kodon_input)
        if expected_output in protein:
            results.append("true")
        else:
            results.append("false")
    print(" ".join(results))
`;

const args = ["AAA", "UUU", "divider", "Phenylalanine", "Kodon tidak dikenal"];

export class Compiler {
  public static compile(code: string): pty.IPty {
    const child = pty.spawn("python3", ["-c", code], {
      name: "xterm-color",
      cwd: path.join(__dirname + "../../../dump"),
      cols: 80,
      rows: 30,
      handleFlowControl: true,
    });
    return child;
  }
  public static TestingCode(code: string): pty.IPty {
    const child = pty.spawn("python3", ["-c", pythonCode, ...args], {
      name: "xterm-color",
      cwd: path.join(__dirname + "../../../dump"),
      cols: 80,
      rows: 30,
      handleFlowControl: true,
    });
    return child;
  }
}
