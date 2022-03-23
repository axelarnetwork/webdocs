# Hackathon developer cheat sheet

## Resources

|                 | Mainnet                                                      | Testnet                                                                         |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Block explorers | https://axelarscan.io/ <br/> https://www.mintscan.io/axelar  | https://testnet.axelarscan.io/ <br/> https://testnet.mintscan.io/axelar-testnet |
| Wallets         | https://wallet.keplr.app/ <br/> https://www.cosmostation.io/ |                                                                                 |
| Faucet          |                                                              | https://faucet.testnet.axelar.dev/                                              |
| RPC endpoints   | https://quickapi.com/ <br/> https://axelar-rpc.pops.one/     | https://quickapi.com/                                                           |

## Tech support

Join our [discord](https://discord.gg/aRZ3Ra6f7D) and visit our [developers](https://discord.com/channels/770814806105128977/955655587260170272) channel.

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

## Code snippets

:::caution Under construction

See [AxelarJS SDK documentation](sdk.md)

:::

## Spin up an Axelar hacknet node

Join a special hacknet network (different from testnet/mainnet):

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
