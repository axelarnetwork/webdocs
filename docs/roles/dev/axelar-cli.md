# Axelar Network CLI

To see a list of Axelar Network CLI commands that can be run, go to our [CLI documentation](https://github.com/axelarnetwork/axelar-core/tree/main/docs/cli)

## Running CLI commands

To play with the Axelar CLI, first join our main or test network by [spinning up a node](/roles/node/join). Wait for the node to finish syncing before running commands. Check that you have some AXL tokens if you are submitting transactions. The [Testnet Faucet](https://faucet.testnet.axelar.dev/) can be used to get testnet tokens.

Also see the tutorials for using Axelar CLI commands to make cross chain asset transfers of AXL or UST tokens to EVM chains.

:::tip

If you submit a transaction and encounter a out of gas error, use the following flags to set the gas manually.

```bash
--gas=auto --gas-adjustment=1.4
```

:::
