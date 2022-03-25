# Hackathon developer cheat sheet

:::caution Under construction

This document will be updated frequently.

:::

- Set up the [Axelar local test environment](local.md)
- Use the [AxelarJS SDK](sdk.md)

## Hacknet

Axelar has set up a special new "hacknet" network (different form testnet/mainnet).

Hacknet RPC endpoint: https://hackathon-nodes.devnet.axelar.dev/

Need test AXL or UST tokens? Reach out to an Axelar team member in person at the event or on discord (link below).

## Tech support

Join the [Axelar discord](https://discord.gg/aRZ3Ra6f7D) and visit the [developers channel](https://discord.com/channels/770814806105128977/955655587260170272).

## Example use cases, integrations

- Cross-chain asset transfer dapp
  - Build a brand new dapp to allow users to transfer assets from one chain to another. (Example: send UST from Terra to Avalanche.)
- Cross-chain wallet
  - Start with an existing open source wallet. Add functionality to transfer assets from one chain to another.
- Cross-chain lending and borrowing
  - Allow users holding assets on chain C to borrow against them in a dapp on chain D.
- Cross-chain asset management
  - Deposit asset A from chain C, earn yield on chain D.
- Universal payments, NFT / game asset portability

## Spin up an Axelar hacknet node

Join hacknet:

```bash
git clone git@github.com:axelarnetwork/axelarate-community.git
cd axelarate-community

# start your node
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -n hacknet

# view logs
tail -f ~/.axelar_hacknet/logs/axelard.log

# stop your node
kill -9 $(pgrep -f "axelard start")
```

Need more info? See detailed instructions for testnet/mainnet: [Quick sync](../node/join.md)
