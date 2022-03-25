# Developer

```mdx-code-block
import ResourcesTable from '/md/resources.md'
```

:::caution Under construction

This section of Axelar documentation is under active development. Expect frequent changes.

:::

## Resources

<ResourcesTable />

Set up the [Axelar local development environment](https://github.com/axelarnetwork/axelar-local-dev)

## Tech support

Join the [Axelar discord](https://discord.gg/aRZ3Ra6f7D) and visit the [developers channel](https://discord.com/channels/770814806105128977/955655587260170272).

## Ways for developers to interact with the Axelar network

1. [AxelarJS SDK](dev/sdk.md)
2. [CLI/gRPC/REST](dev/cli.md)

## Things developers can do with the Axelar network

### New! Cross-chain EVM contract calls

The Axelar network supports arbitrary cross-chain contract calls for EVM chains. This feature can be used to transfer ERC-20 tokens across EVM chains---a simple and efficient alternative to deposit addresses for EVM-to-EVM token transfers.

See the [cross-chain contract calls explainer](dev/explainers/cccc.md).

### Get a deposit address for cross-chain token transfer

Build your own [Satellite dapp](https://satellite.axelar.network/) or something even better! Use [AxelarJS SDK](dev/sdk.md) or [CLI](dev/cli.md) to generate a one-time deposit address `addr` for asset `A` on chain `C`. Send `A` tokens to `addr` and sit back while the Axelar network transfers those `A` tokens to another chain `D`.
