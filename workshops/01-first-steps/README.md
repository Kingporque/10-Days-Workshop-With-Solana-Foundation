# First workshop: your first Solana read

This workshop is for individual builders. You will create a practice wallet, inspect an account on devnet, and run a small JavaScript program that reads live account data.

**You need:** a laptop, Node.js 20 or newer, and internet access. No paid RPC account is required. If you already have a devnet wallet, you can use its public address.

## Exercise 1 — Make a practice wallet

1. Follow the [Solana Quick Start](https://solana.com/docs/intro/quick-start) to create a Solana Playground wallet and connect to **devnet**.
2. Copy your **public address**. Do not copy or share your recovery phrase or private key.
3. Open `https://explorer.solana.com/address/YOUR_ADDRESS?cluster=devnet`, replacing `YOUR_ADDRESS` with your public address.
4. Get devnet test SOL through the Quick Start's faucet instructions. If the faucet is slow or rate limited, you can still continue with Exercise 2; an address does not need SOL to be queried.

**Show your result:** your address page on Solana Explorer with devnet selected.

## Exercise 2 — Read an account with JavaScript

You must provide at least one public address each time you run the script; it does not choose a default wallet address. If you run it without an address, it prints usage instructions and exits with an error. From this directory, pass one or more addresses separated by `|` as a quoted command-line argument so your shell passes the pipe character to the script instead of treating it as a shell pipeline. Spaces around addresses are okay:

```bash
node account-viewer.mjs "YOUR_ADDRESS_1|YOUR_ADDRESS_2"
```

Replace both placeholders with the public addresses you want to inspect; no particular address is built in. Keep the quotes around the complete list so the shell passes the `|` separator to the script instead of treating it as a command pipeline. A single address is also accepted:

```bash
node account-viewer.mjs YOUR_ADDRESS
```

The script reports each address separately. If one address is invalid or its RPC request fails, it still attempts the remaining addresses and reports an error for the failed one. The command exits with a failure status if any address fails, even if other lookups succeed. Compare the successful results with Solana Explorer. Find the balance in lamports and SOL, the account owner, and whether the account is executable. If your wallet has no activity yet, note how the script describes an account that does not exist onchain.

You can use a different devnet RPC endpoint by setting `SOLANA_DEVNET_RPC_URL`:

```bash
SOLANA_DEVNET_RPC_URL="https://your-devnet-rpc.example" node account-viewer.mjs "ADDRESS1|ADDRESS2"
```

Only use an endpoint that points to devnet; the script and Explorer links are labeled for devnet.

**Show your result:** your terminal output and the matching devnet explorer page.

## During the workshop: make it yours

Change one part of the output so a new student can understand it more easily. Ideas: explain what a lamport is, label executable accounts as programs, or add a short message when an address has no onchain data yet. Run the script again and show your change.

## Before the next build night: your own challenge

Explore and customize the **devnet account watchlist**:

1. Run the command with **two or more public addresses** separated by `|`.
2. Check each account summary: address, SOL balance (or “not found”), owner, and whether it is executable.
3. Try an invalid address in the list and confirm it does not hide the other results.
4. Add a short `README.md` to your own repository with the command to run your watchlist and one thing you learned about the accounts you inspected.

Try any two public addresses on devnet and check them in Explorer. At the October 22 build night, bring your repository and show the command running, even if one part is still unfinished.

**Done when:** one command displays results for at least two addresses, and a bad address produces a useful message without stopping the other result. For example: `node account-viewer.mjs "ADDRESS1|ADDRESS2"`.

**Hint:** `process.argv[2].split("|")` gives you the address list from the quoted argument. You can reuse `getAccountInfo` and `describeAccount`; handle each address separately so one failure does not stop the rest. The [Week 1 challenge](../../curriculum/week-01-accounts-rpc/README.md) takes this further.

## If something goes wrong

- `node: command not found`: install Node.js 20+ or use a machine with Node installed.
- `Invalid address`: copy the full public address without spaces or punctuation.
- `HTTP 429` or a temporary RPC error: wait briefly and retry. The public devnet RPC is rate limited. A free-tier devnet RPC can be used by setting `SOLANA_DEVNET_RPC_URL`, but make sure it actually points to devnet.
- Faucet unavailable: you can still inspect public addresses with Exercise 2 and retry the faucet later.

## Read more

- [Solana accounts](https://solana.com/docs/core/accounts)
- [Solana JSON-RPC overview](https://solana.com/docs/rpc/http)
- [Solana clusters and public RPC endpoints](https://solana.com/docs/references/clusters)
