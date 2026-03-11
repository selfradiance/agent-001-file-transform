import { createHash } from "node:crypto";
import fs from "node:fs";

export function computeHash(filePath: string): string {
  const content = fs.readFileSync(filePath);
  const hex = createHash("sha256").update(content).digest("hex");
  return `sha256:${hex}`;
}

export function verifyOutput(filePath: string, expectedHash: string): boolean {
  return computeHash(filePath) === expectedHash;
}
