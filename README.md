# Agent 001: Bonded File Transform

A bonded file-transform agent. It accepts a task contract (JSON), executes a file transformation, verifies the result deterministically, and resolves through [AgentGate](https://github.com/selfradiance/agentgate). If the output is correct, the bond is released. If not, the bond is slashed. The agent has skin in the game.

## How It Works

1. Read and validate the task contract
2. Create an Ed25519 identity with AgentGate
3. Lock a bond (agent puts up collateral)
4. Register a bonded action
5. Run the transform (CSV to JSON)
6. Verify the output against the expected SHA-256 hash
7. Resolve the action as `success` or `failed` — bond released or slashed accordingly

## Task Contract

```json
{
  "task": "file-transform",
  "transform_type": "csv-to-json",
  "input_file": "examples/sample-input.csv",
  "output_file": "examples/sample-output.json",
  "bond_amount_cents": 100,
  "ttl_seconds": 300,
  "expected_output_hash": "sha256:2d02509c..."
}
```

| Field | Description |
|---|---|
| `task` | Must be `"file-transform"` |
| `transform_type` | Must be `"csv-to-json"` (only supported type) |
| `input_file` | Path to the input CSV file |
| `output_file` | Path where the JSON output will be written |
| `bond_amount_cents` | Bond collateral in cents |
| `ttl_seconds` | Bond time-to-live in seconds |
| `expected_output_hash` | SHA-256 hash of the expected output (`sha256:` prefix) |

## Quick Start

**Prerequisites:** Node.js 20+, [AgentGate](https://github.com/selfradiance/agentgate) running locally on port 3000.

```bash
# Clone and install
git clone https://github.com/selfradiance/agent-001-file-transform.git
cd agent-001-file-transform
npm install

# Configure
cp .env.example .env
# Edit .env and set AGENTGATE_REST_KEY

# Run the agent
npm run agent -- examples/sample-contract.json

# Run tests
npm test
```

## Built on AgentGate

This is the first agent in the single-task sandboxed agent pattern. Each agent locks a bond, performs one deterministic task, and resolves through [AgentGate](https://github.com/selfradiance/agentgate) — creating cryptographic accountability for autonomous work.

## License

MIT
