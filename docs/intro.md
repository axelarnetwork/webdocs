---
sidebar_position: 1
slug: /
---

# Build on Axelar

:::caution Under construction

TODO: fancy buttons for roles

:::

## Button: Developer

Button: [I'm a developer](roles/dev.md).

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

## Button: User

## Button: Node operator

## Button: Validator
