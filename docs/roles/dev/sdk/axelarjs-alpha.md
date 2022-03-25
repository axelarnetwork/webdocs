# Alpha (v0.5.xx)

## What you can do with v0.5.xx

1. **New!** Cross-chain EVM contract calls
2. Get a deposit address for cross-chain token transfer

## Install

Install the latest patch of AxelarJS SDK v0.5.xx:

```bash
npm i --save @axelar-network/axelarjs-sdk@alpha
```

## New! Cross-chain EVM contract calls

The Axelar network supports arbitrary cross-chain contract calls for EVM chains. This feature can be used to transfer ERC-20 tokens across EVM chains---a simple and efficient alternative to deposit addresses for EVM-to-EVM token transfers.

The `AxelarGateway` library in this SDK provides Typescript-wrapped utility functions for a handful of the core methods, or you can access the contract directly.

```typescript
const environment = "devnet";
const evmChain = "ethereum";
const axelarGateway = AxelarGateway.create(
  environment,
  evmChain,
  ethers.provider
);
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
const axelarGateway = new AxelarGateway(
  myCustomContractAddress,
  ethers.provider
);
```

To get access to the gateway contract directly:

```typescript
const contract = axelarGateway.getContract();
```

## Get a deposit address for cross-chain token transfer

We'll write a function `myGetDepositAddress` that returns a new deposit address `A` on the Axelar chain. A user could then send AXL tokens to `A`. The Axelar network will transfer any such AXL tokens to the Avalanche chain. You can substitute (Axelar, AXL, Avalanche) for many other choices of (source chain, asset, destination chain).

See [Deposit address demo (alpha)](deposit-address-demo-alpha.md) for a working demo in the browser.

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
    destinationAddress:
      destinationAddress || "0x74Ccd7d9F1F40417C6F7fD1151429a2c44c34e6d",
  };
  const requestPayload: GetDepositAddressDto = {
    payload,
  } as GetDepositAddressDto;
  const linkAddress: string = await api.getDepositAddress(requestPayload);
  return linkAddress;
};
```
