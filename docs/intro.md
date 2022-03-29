---
sidebar_position: 1
slug: /
---

# Build on Axelar

```mdx-code-block
import ResourcesTable from '/md/resources.md'
```

[I'm a developer](roles/dev.md).

Use [Axelar gateway contracts](https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/src/interfaces/IAxelarGateway.sol) to call any EVM contract on any chain:

```solidity
interface IAxelarGateway {

  function callContractWithToken(
    string memory destinationChain,
    string memory contractAddress,
    bytes memory payload,
    string memory symbol,
    uint256 amount
  ) external;

  // etc...

}
```

## Resources

<ResourcesTable />

- Token contract addresses, releases: [Mainnet](/releases/mainnet) | [Testnet](/releases/testnet)
- Looking for help? Join the [Axelar discord](https://discord.gg/aRZ3Ra6f7D) and visit channels: [developers](https://discord.com/channels/770814806105128977/955655587260170272) | [testnet](https://discord.com/channels/770814806105128977/799299951078408242) | [general](https://discord.com/channels/770814806105128977/770814806105128980)
