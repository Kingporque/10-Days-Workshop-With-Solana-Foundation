import assert from "node:assert/strict";
import test from "node:test";
import {
  describeAccount,
  formatSol,
  getAccountInfo,
  getAccountResults,
  validateAddress,
} from "./account-viewer.mjs";

// Test-only fixture: the mocked RPC calls never contact the network or use a real wallet.
const address = "11111111111111111111111111111111";

// Check fractional and zero balances to ensure SOL formatting stays exact and compact.
test("formats lamports without floating-point rounding", () => {
  assert.equal(formatSol(1_500_000_001), "1.500000001");
  assert.equal(formatSol(0), "0");
});

// Invalid input must be rejected before fetch is called, both directly and through the RPC helper.
test("rejects malformed addresses before making an RPC request", async () => {
  assert.throws(() => validateAddress("not-an-address"), /Invalid address/);
  let called = false;
  await assert.rejects(
    getAccountInfo("not-an-address", { fetchImpl: () => { called = true; } }),
    /Invalid address/,
  );
  assert.equal(called, false);
});

// A fake successful JSON-RPC response verifies account parsing and the human-readable summary.
test("reads a valid RPC account response", async () => {
  const account = await getAccountInfo(address, {
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({
        result: { value: { lamports: 1_500_000_001, owner: address, executable: false } },
      }),
    }),
  });
  const output = describeAccount(address, account);
  assert.match(output, /1\.500000001 SOL/);
  assert.match(output, /Owner program:/);
  assert.match(output, /cluster=devnet/);
});

// A valid address with no on-chain account should be described without throwing.
test("explains an account with no onchain data", () => {
  assert.match(describeAccount(address, null), /no onchain data found yet/);
});

// The invalid address should produce its own error while the valid address still gets fetched.
test("returns valid account data when another address is invalid", async () => {
  let requestCount = 0;
  const results = await getAccountResults(["not-an-address", address], {
    fetchImpl: async () => {
      requestCount += 1;
      return {
        ok: true,
        json: async () => ({
          result: { value: { lamports: 1_000_000_000, owner: address, executable: false } },
        }),
      };
    },
  });

  assert.equal(requestCount, 1);
  assert.match(results[0].error, /Invalid address/);
  assert.match(results[1].output, /1 SOL/);
});

// Simulate a temporary RPC failure, then a successful response, to verify processing continues.
test("continues after an RPC failure for one address", async () => {
  let requestCount = 0;
  const results = await getAccountResults([address, address], {
    fetchImpl: async () => {
      if (requestCount++ === 0) {
        throw new Error("network unavailable");
      }
      return {
        ok: true,
        json: async () => ({
          result: { value: { lamports: 1_000_000_000, owner: address, executable: false } },
        }),
      };
    },
  });

  assert.match(results[0].error, /network unavailable/);
  assert.match(results[1].output, /1 SOL/);
});
