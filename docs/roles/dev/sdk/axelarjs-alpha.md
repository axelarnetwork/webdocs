# Alpha (v0.5.xx)

## Install

Install the latest patch of AxelarJS SDK v0.5.xx:

```bash
npm i --save @axelar-network/axelarjs-sdk@0.5.0-alpha.3
```

or 

```bash
npm i --save @axelar-network/axelarjs-sdk@alpha
```

## What can you do with this SDK?

### Get a deposit address from the Axelar network

We'll write a function `myGetDepositAddress` that returns a new deposit address `A` on the Axelar chain. A user could then send AXL tokens to `A`. The Axelar network will transfer any such AXL tokens to the Avalanche chain. You can substitute (Axelar, AXL, Avalanche) for many other choices of (source chain, asset, destination chain).

See [Deposit address demo](deposit-address-demo.md) for a working demo in the browser. //TBU

The function `myGetDepositAddress` wraps a call to `getDepositAddress` from the AxelarJS SDK API like so:

```typescript
import {
  GetDepositAddressDto,
  GetDepositAddressPayload,
  TransferAssetBridge,
} from "@axelar-network/axelarjs-sdk";

const environment = "testnet";
const api = new TransferAssetBridge(environment);

const myGetDepositAddress = async (destinationAddress?: string) => {
    const payload: GetDepositAddressPayload = {
        fromChain: "axelar",
        toChain: "avalanche",
        asset: "uaxl",
        destinationAddress: destinationAddress || "0x74Ccd7d9F1F40417C6F7fD1151429a2c44c34e6d"
    };
    const requestPayload: GetDepositAddressDto = { payload } as GetDepositAddressDto
    const linkAddress: string = await api.getDepositAddress(requestPayload);
    return linkAddress;
};
```


### Invoke methods directly on the Axelar Gateway Contracts on EVM chains

With axelar-core v[v.16.0]+, the Network supports general message passing of arbitrary payloads across network. The AxelarGateway library in the SDK provides Typescript-wrapped utility functions for a handful of the core methods. It alternatively exposes the smart contract directly. 

```typescript
    const environment = "devnet";
    const evmChain = "ethereum";
    const axelarGateway = AxelarGateway.create(environment, evmChain, ethers.provider);
    const MOCK_DESTINATION_CONTRACT_ADDRESS = "TBD";

    const gatewayTx = await axelarGateway.createCallContractTx({
        destinationContractAddress: MOCK_DESTINATION_CONTRACT_ADDRESS,
        destinationChain: "avalanche",
        payload: ethers.utils.formatBytes32String("test"),
    });

    const tx = await gatewayTx.send(signer);
    const receipt = await tx.wait();

```

If you are developing locally with contracts that are not deployed, you can alternatively inject those directly. Instead of calling `AxelarGateway.create` above, you can instantiate the gateway this way:
```typescript
const myCustomContractAddress = "0x...";
const axelarGateway = new AxelarGateway(myCustomContractAddress, ethers.provider);
```

To get access to the gateway contract directly:
```typescript
const contract = axelarGateway.getContract();
```
