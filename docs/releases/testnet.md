# Testnet

Variable  | Value
------------- | -------------
`axelar-core` version | `v0.13.6`
`tofnd` version | `v0.8.2`
Ethereum Axelar Gateway contract address | `0xBC6fcce7c5487d43830a219CA6E7B83238B41e71`
Ethereum AXL token address | `0x321C017c08b681b1a34909eb159ed128772a5Bbe`
Ethereum UST token address | `0x1487F3faefE78792CDC48D87FF32aaC6650fd85f`
Ethereum LUNA token address | `0x7Aa125543B9D4a361f58aC1Ff3Bea86eAF6D948B`
Avalanche Axelar Gateway contract address | `0xC249632c2D40b9001FE907806902f63038B737Ab`
Avalanche AXL token address | `0x46Cc87ea84586C03bB2109ED9B33F998d40B7623`
Avalanche UST token address | `0x43F4600b552089655645f8c16D86A5a9Fa296bc3`
Avalanche LUNA token address | `0x50a70aBb7bd6EbBcC46Df7C0d033C568F563cA27`
Fantom Axelar Gateway contract address | `0x97837985Ec0494E7b9C71f5D3f9250188477ae14`
Fantom AXL token address | `0xc1Ff1364f7A263a535E3caF60d424b78bB5b7c19`
Fantom UST token address | `0x89A1D86901D25EFFe5D022bDD1132827e4D7f010`
Fantom LUNA token address | `0x121286BeDd58d58558A30ED2db2f4a7c6Eb646A3`
Polygon Axelar Gateway contract address | `0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B`
Polygon AXL token address | `0x6ff1fa8CfB26551aA13e3d5dbf077f0a98ECd232`
Polygon UST token address | `0xa32575f477FDEbFA02513880d47F6515Da42FB90`
Polygon LUNA token address | `0x6Ad38DD216DC344c6B3CeDc34612e1014e2aa469`
Moonbeam Axelar Gateway contract address | `0x5769D84DD62a6fD969856c75c7D321b84d455929`
Moonbeam AXL token address | `0x8a6614F33EC72FB70084B22b2EFfb643424e9Cc9`
Moonbeam UST token address | `0xD34007Bb8A54B2FBb1D6647c5AbA04D507ABD21d`
Moonbeam LUNA token address | `0xa1cF442E73045F1ea9960499FC8771454a01019D`
Terra -> Axelar IBC channel id | `channel-78`
Axelar -> Terra IBC channel id | `channel-0`
Cosmoshub -> Axelar IBC channel id | `not yet available`
Axelar -> Cosmoshub IBC channel id | `not yet available`

## Minimum transfer amounts

For each asset X in (AXL, UST, LUNA) and each external chain Y in (Ethereum, non-Ethereum EVM, Cosmos/IBC): any transfer of asset X to chain Y must exceed the minimum amount given in the table below.  (If Y is the origin chain for asset X then this transfer is called "redeem"/"burn"; there is no minimum in this case.)

If the total amount of asset X sent to a deposit address A is smaller than the minimum then those deposits will sit in the queue until a future deposit to A brings the total above the minimum.

Asset symbol | Ethereum | non-Ethereum EVM | Cosmos/IBC
---|---|---|---
AXL | 100 AXL | 10 AXL | 0.1 AXL
UST | 100 UST | 10 UST | 0.1 UST
LUNA | 1 LUNA | 0.1 LUNA | 0.001 LUNA

## Transaction Fees

The Network will assess a processing fee of __0.1%__ percent on any transaction through the protocol. For example, a transfer of 100 of asset X from Chain Y to Chain Z will result in 99.9 of token X in the destination address (specified by the user) on Chain Z. 

Additionally, users should be prepared to pay for any transaction fees assessed by the source chain when transferring funds into a deposit account. These fees are typically in the form of native tokens in that chain.