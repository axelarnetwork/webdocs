---
sidebar_position: 1
slug: /
---

# What is Axelar?

Axelar is a decentralized layer-one blockchain that connects all blockchains, assets and applications through a universal set of protocols and APIs.

Deploy your dApp on the blockchain best suited for your use case. Through a single integration with the Axelar API unlock access to multiple interconnected Axelar networks, users, assets, liquidity and data.

## Learn for your role:

### [Developer](roles/dev.md)

Use Axelar gateway contracts to call any EVM contract on any chain:

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

### [Satellite user](roles/user/satellite.md)

_Satellite_ is a web app built on top of the Axelar network. Use it to transfer assets from one chain to another.

### [Node operator](roles/node/join.md)

Learn how to run a node on the Axelar netowrk.

### [Validator](roles/validator/setup/overview.md)

Axelar validators facilitate cross-chain connections by participating in the following activities:

- Block creation on the Axelar blockchain
- Multi-party cryptography protocols for passing general messages between blockchains
- Reaching consensus on events that occur on other blockchains
