---
sidebar_position: 1
slug: /
---

# Build on Axelar

## [Developer](roles/dev.md)

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

}
```

## [User](roles/user/satellite.md)

## [Node operator](roles/node/join.md)

## [Validator](roles/validator/setup/overview.md)
