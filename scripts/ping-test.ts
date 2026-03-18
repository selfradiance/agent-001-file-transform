/**
 * ping-test.ts
 *
 * Proves that this project can call the AgentGate REST API.
 * Generates an Ed25519 keypair, registers an identity, and prints the response.
 *
 * Usage: npx tsx src/ping-test.ts
 */

import "dotenv/config";
import { AgentGateClient, generateKeypair, printStep } from "../src/agentgate-client";

const BASE_URL = process.env.AGENTGATE_URL ?? "http://127.0.0.1:3000";
const API_KEY = process.env.AGENTGATE_REST_KEY;

async function main() {
  if (!API_KEY) {
    throw new Error("AGENTGATE_REST_KEY is not set in .env");
  }

  const client = new AgentGateClient(BASE_URL, API_KEY);
  const keys = generateKeypair();
  console.log("Generated Ed25519 keypair");
  console.log("  publicKey:", keys.publicKey);

  const { identityId, raw } = await client.createIdentity(keys.publicKey, keys.privateKey);
  printStep("Create Identity", raw);
  console.log(`  identityId: ${identityId}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
