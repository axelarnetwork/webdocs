# Testnet

```mdx-code-block
import UpgradePath from '/md/testnet/upgrade-path.md'
```

| Variable                                         | Value                                        |
| ------------------------------------------------ | -------------------------------------------- |
| `axelar-core` version                            | `v0.16.1`                                    |
| `tofnd` version                                  | `v0.8.2`                                     |
| Ropsten Ethereum Axelar Gateway contract address | `0xBC6fcce7c5487d43830a219CA6E7B83238B41e71` |
| Ropsten Ethereum AXL token address               | `0x321C017c08b681b1a34909eb159ed128772a5Bbe` |
| Ropsten Ethereum UST token address               | `0x1487F3faefE78792CDC48D87FF32aaC6650fd85f` |
| Ropsten Ethereum LUNA token address              | `0x7Aa125543B9D4a361f58aC1Ff3Bea86eAF6D948B` |
| Ropsten Ethereum Fake USDC token address         | `0x772dF70ff68C8dEa1863794824410e90e46Cd433` |
| Avalanche Axelar Gateway contract address        | `0xC249632c2D40b9001FE907806902f63038B737Ab` |
| Avalanche AXL token address                      | `0x46Cc87ea84586C03bB2109ED9B33F998d40B7623` |
| Avalanche UST token address                      | `0x43F4600b552089655645f8c16D86A5a9Fa296bc3` |
| Avalanche LUNA token address                     | `0x50a70aBb7bd6EbBcC46Df7C0d033C568F563cA27` |
| Avalanche Fake USDC token address                | `0x3fb643De114d5dc03dDE8DFDBC06c60dcAF7D3C4` |
| Fantom Axelar Gateway contract address           | `0x97837985Ec0494E7b9C71f5D3f9250188477ae14` |
| Fantom AXL token address                         | `0xc1Ff1364f7A263a535E3caF60d424b78bB5b7c19` |
| Fantom UST token address                         | `0x89A1D86901D25EFFe5D022bDD1132827e4D7f010` |
| Fantom LUNA token address                        | `0x121286BeDd58d58558A30ED2db2f4a7c6Eb646A3` |
| Fantom Fake USDC token address                   | `0x0F09c67DBdb8bBe7E931975C38d591F0BE95b4a9` |
| Polygon Axelar Gateway contract address          | `0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B` |
| Polygon AXL token address                        | `0x6ff1fa8CfB26551aA13e3d5dbf077f0a98ECd232` |
| Polygon UST token address                        | `0xa32575f477FDEbFA02513880d47F6515Da42FB90` |
| Polygon LUNA token address                       | `0x6Ad38DD216DC344c6B3CeDc34612e1014e2aa469` |
| Polygon Fake USDC token address                  | `0xDD58E6c519172838f91cC9f86C5C053891346f70` |
| Moonbeam Axelar Gateway contract address         | `0x5769D84DD62a6fD969856c75c7D321b84d455929` |
| Moonbeam AXL token address                       | `0x8a6614F33EC72FB70084B22b2EFfb643424e9Cc9` |
| Moonbeam UST token address                       | `0xD34007Bb8A54B2FBb1D6647c5AbA04D507ABD21d` |
| Moonbeam LUNA token address                      | `0xa1cF442E73045F1ea9960499FC8771454a01019D` |
| Moonbeam Fake USDC token address                 | `0x80C65A8CAf599e9630984bC53b60F886006D2860` |
| Terra -> Axelar IBC channel id                   | `channel-78`                                 |
| Axelar -> Terra IBC channel id                   | `channel-0`                                  |
| Osmosis -> Axelar IBC channel id                 | `channel-184`                                |
| Axelar -> Osmosis IBC channel id                 | `channel-3`                                  |
| Cosmoshub -> Axelar IBC channel id               | `channel-238`                                |
| Axelar -> Cosmoshub IBC channel id               | `channel-4`                                  |

## Cross-chain transfer fee

The Network (and thus the Satellite app) charges a base fee for all cross-chain transfers.
This fee only depends on the source/destination chain and the asset and does NOT take a percentage from the transfer amount.
When transferring an asset X from chain Y to chain Z, the transfer fee is the sum of per-chain fee for that asset.
For e.g. a transfer of 1000 UST from Terra to Avalanche will have a fee of 1.5 UST (= 0.5 UST for Terra + 1.0 UST for Avalanche), and so the recipient will get 998.5 UST.

| Asset symbol | Ethereum | non-Ethereum EVM | Cosmos (Terra) |
| ------------ | -------- | ---------------- | -------------- |
| UST          | 20 UST   | 1 UST            | 0.5 UST        |
| LUNA         | 0.2 LUNA | 0.01 LUNA        | 0.005 LUNA     |

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

## Upgrade Path

<UpgradePath />
