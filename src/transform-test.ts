import fs from "node:fs";
import path from "node:path";
import { csvToJson } from "./transform";

const inputPath = path.resolve("examples/sample-input.csv");
const outputPath = path.resolve("examples/sample-output.json");

console.log(`Converting ${inputPath} → ${outputPath}`);
csvToJson(inputPath, outputPath);

const result = fs.readFileSync(outputPath, "utf8");
console.log("\nOutput:");
console.log(result);
