import fs from "node:fs";

export function csvToJson(inputPath: string, outputPath: string): void {
  const raw = fs.readFileSync(inputPath, "utf8").trimEnd();
  const lines = raw.split("\n");

  if (lines.length < 2) {
    throw new Error("CSV must have a header row and at least one data row");
  }

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
