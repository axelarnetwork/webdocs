# Axelar command-line interface (CLI)

Some CLI commands require access to a fully synced Axelar node. Learn how to [start your own Axelar node](../node/join.md).

Some CLI commands require AXL tokens to pay for on-chain transaction fees. Get testnet AXL tokens from the [Axelar testnet faucet](https://faucet.testnet.axelar.dev/).

Use the Axelar CLI to execute cross-chain token transfers:

- [Send UST to an EVM chain](cli/ust-to-evm.md)
- [Redeem UST from an EVM chain](cli/ust-from-evm.md)
- [Send AXL to an EVM chain](cli/axl-to-evm.md)
- [Redeem AXL from an EVM chain](cli/axl-from-evm.md)

In addition to the Axelar-specific CLI features mentioned above, Axelar also offers the same basic set of CLI commands as any other Cosmos SDK project.

[Complete Axelar CLI reference](https://github.com/axelarnetwork/axelar-core/tree/main/docs/cli)

:::tip

If you submit a transaction and encounter a out of gas error, use the following flags to set the gas manually.

```bash
--gas=auto --gas-adjustment=1.5
```

:::
