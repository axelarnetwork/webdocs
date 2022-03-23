# Hacknet

| Variable                                  | Value                                        |
| ----------------------------------------- | -------------------------------------------- |
| `axelar-core` version                     | `0612e0c32a7f63795034b25f69fce4829d9dd788`   |
| `tofnd` version                           | `v0.8.2`                                     |
| Chain ID                                  | `axelar-devnet-rammstein-3`                  |
| Avalanche Axelar Gateway contract address | `0x4ffb57Aea2295d663B03810a5802ef2Bc322370D` |
| Avalanche AXL token address               | `0x2dB7c0758Dc4FE186584cd94d1cd3010E8a97879` |
| Avalanche UST token address               | `0x96640d770bf4a15Fb8ff7ae193F3616425B15FFE` |
| Avalanche LUNA token address              | `0xf640B78954f09673A01e9AEFd11c353DDE3c8D6B` |
| Ethereum Axelar Gateway contract address  | `0x7358799e0c8250f0B7D1164824F6Dd5bA31C9Cd6` |
| Ethereum AXL token address                | `0x4335F049AbD9D96faFBcE65C355FCCf1b0997f09` |
| Ethereum UST token address                | `0x07DD5fE9541F6aC611850D17C433719e42C745cd` |
| Ethereum LUNA token address               | `0xa4B18Ad39489279D8C2bB9777730f6728fE17Ef9` |
| Moonbeam Axelar Gateway contract address  | `0x1b23BE90a16efe8fD3008E742dDd9531dC5845b0` |
| Moonbeam AXL token address                | `0x24C11307723fD65B926233b097e4E548017e4A88` |
| Moonbeam UST token address                | `0x2fB01c6837f1C441BE7fbf5868bE777FC4A5227C` |
| Moonbeam LUNA token address               | `0xF9dFC3d867670B4a976546B03cef209aEe54F147` |
| Terra -> Axelar IBC channel id            | `channel-105`                                |
| Axelar -> Terra IBC channel id            | `channel-0`                                  |

## Cross-chain transfer fee

The Network (and thus the Satellite app) charges a base fee for all cross-chain transfers.
This fee only depends on the source/destination chain and the asset and does NOT take a percentage from the transfer amount.
When transferring an asset X from chain Y to chain Z, the transfer fee is the sum of per-chain fee for that asset.
For e.g. a transfer of 1000 UST from Terra to Avalanche will have a fee of 1.5 UST (= 0.5 UST for Terra + 1.0 UST for Avalanche), and so the recipient will get 998.5 UST.

| Asset symbol | Ethereum | non-Ethereum EVM | Cosmos Chains | Decimals | Unit     |
| ------------ | -------- | ---------------- | ------------- | -------- | -------- |
| UST          | 20 UST   | 1 UST            | 0.5 UST       | 6        | uusd     |
| LUNA         | 0.2 LUNA | 0.01 LUNA        | 0.005 LUNA    | 6        | uluna    |
| ATOM         | 0.7 ATOM | 0.04 ATOM        | 0.02 ATOM     | 6        | uatom    |
| USDC         | 20 USDC  | 1 USDC           | 0.5 USDC      | 6        | uusdc    |
| FRAX         | 20 FRAX  | 1 FRAX           | 0.5 FRAX      | 18       | frax-wei |

The current transfer fee can also be queried on the network with

```bash
axelard q nexus transfer-fee [source chain] [destination chain] [amount]
```

For e.g., querying the example transfer above (note `1 UST = 10^6 uusd`),

```bash
axelard q nexus transfer-fee terra avalanche 1000000000uusd
```

The per-chain fee info can be queried via

```bash
axelard q nexus fee avalanche uusd
```

If the total amount of asset X sent to a deposit address A is NOT greater than the transfer fee,
then those deposits will sit in the queue until a future deposit to A brings the total above the fee.

Additionally, users should be prepared to pay for any transaction fees assessed by the source chain when transferring funds into a deposit address.
These fees are typically in the form of native tokens on that chain (for e.g. LUNA on Terra, ETH on Ethereum).
