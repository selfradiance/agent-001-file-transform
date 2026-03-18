import path from "node:path";
import { computeHash, verifyOutput } from "../src/verify";

const filePath = path.resolve("examples/sample-output.json");

const hash = computeHash(filePath);
console.log("Hash:", hash);

console.log("Verify (correct):", verifyOutput(filePath, hash));
console.log("Verify (wrong):  ", verifyOutput(filePath, "sha256:wrong"));
