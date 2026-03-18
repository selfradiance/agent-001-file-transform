import fs from "node:fs";
import path from "node:path";

function assertSafePath(filePath: string): void {
  const resolved = path.resolve(filePath);
  // Block obvious traversal attacks — paths targeting system directories
  const blocked = ["/etc", "/usr", "/bin", "/sbin", "/root", "/sys", "/proc"];
  if (blocked.some((dir) => resolved.startsWith(dir))) {
    throw new Error(`Path blocked: ${filePath} targets a system directory`);
  }
}

export function csvToJson(inputPath: string, outputPath: string): void {
  assertSafePath(inputPath);
  assertSafePath(outputPath);
  const raw = fs.readFileSync(inputPath, "utf8").trimEnd();
  const lines = raw.split("\n");

  if (lines.length < 2) {
    throw new Error("CSV must have a header row and at least one data row");
  }

  // Simple comma-split parser — does NOT handle quoted fields, embedded commas,
  // or newlines inside quotes. Sufficient for the demo contract's simple CSV.
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = values[i] ?? "";
    }
    return obj;
  });

  fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2) + "\n", "utf8");
}
