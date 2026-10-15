# 10 Days Workshop With Solana

A practical, beginner-friendly Solana learning path for builders in the University of Uyo community. The repository moves from wallet and account basics through transactions, tokens, Rust, Anchor programs, PDAs, and a full-stack project.

You can follow the material at your own pace. Each curriculum section includes a challenge and a `SOLUTION.md` with guidance; try the challenge before consulting the solution.

## Start here

1. Read the [curriculum guide](curriculum/README.md) for the learning approach.
2. Complete the [first workshop](workshops/01-first-steps/README.md), which includes a runnable JavaScript account viewer.
3. Continue through the [weekly curriculum](#learning-path).
4. Use the [project brief](templates/project-brief.md) to scope a small project of your own.

Basic familiarity with JavaScript or TypeScript, Git, and a terminal is helpful. Rust and Solana concepts are introduced as you progress.

## Learning path

| Section | Focus | Build |
| --- | --- | --- |
| [Week 0](curriculum/week-00-setup/README.md) | Setup, clusters, and wallet safety | A verified development setup |
| [Week 1](curriculum/week-01-accounts-rpc/README.md) | Accounts, programs, and RPC | A multi-address account viewer |
| [Week 2](curriculum/week-02-transactions/README.md) | Instructions, transactions, and confirmation | A reviewed devnet transaction flow |
| [Week 3](curriculum/week-03-tokens-wallet-ui/README.md) | Tokens and wallet-connected UI | A page that displays devnet assets |
| [Week 4](curriculum/week-04-rust/README.md) | Rust fundamentals | A tested Rust data model |
| [Week 5](curriculum/week-05-anchor/README.md) | Anchor programs and persistent state | A locally tested program |
| [Week 6](curriculum/week-06-pdas-security/README.md) | PDAs, constraints, and defensive programs | Protected per-user program state |
| [Week 7](curriculum/week-07-full-stack/README.md) | Full-stack integration and transaction UX | An end-to-end devnet MVP |
| [Week 8](curriculum/week-08-demo-day/README.md) | Demonstration and continuation | A reproducible project demo |

## Run the account viewer

The first workshop's CLI reads one or more account addresses from **devnet**. It uses Node.js 20 or newer and has no third-party package dependencies.

From the workshop directory:

```bash
cd workshops/01-first-steps
node account-viewer.mjs "11111111111111111111111111111111|YOUR_PUBLIC_ADDRESS"
```

Separate addresses with `|` and quote the full list so the shell does not interpret the pipe as a command pipeline. The CLI prints a result or error for each address and continues if one lookup fails. It exits with a failure status if any address fails. A single address is also supported:

```bash
node account-viewer.mjs YOUR_PUBLIC_ADDRESS
```

To use another **devnet** RPC endpoint, set `SOLANA_DEVNET_RPC_URL`:

```bash
SOLANA_DEVNET_RPC_URL="https://your-devnet-rpc.example" node account-viewer.mjs "ADDRESS1|ADDRESS2"
```

Run the tests from the repository root:

```bash
node --test workshops/01-first-steps/account-viewer.test.mjs
```

The viewer performs read-only RPC requests. It does not connect to a wallet, sign, or submit transactions.

## Repository layout

- [`workshops/`](workshops/) — guided hands-on workshops and runnable examples.
- [`curriculum/`](curriculum/) — weekly challenges and reference solutions.
- [`templates/`](templates/) — prompts and templates for planning your own project.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — guidelines for improving the learning materials.

## Wallet and development safety

- Share public addresses only. Never commit or share a seed phrase, private key, or keypair file.
- Use devnet and disposable learning wallets for exercises.
- Confirm the selected cluster, destination, amount, and requested authority before signing any transaction.
- Treat RPC results and on-chain account data as untrusted input.

## Resources

- [Solana developer resources](https://solana.com/developers)
- [Solana development courses](https://solana.com/developers/courses)
- [Anchor documentation](https://www.anchor-lang.com/docs)

Tooling changes over time. Follow the versions and setup instructions recommended for your cohort when starting each exercise.

## Questions and contributions

Bring questions and work in progress to a campus session, or open an issue in the repository. If you find a confusing step, typo, or broken link, contributions are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).
