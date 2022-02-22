# Testnet

Variable  | Value
------------- | -------------
`axelar-core` version | `v0.14.0`
`tofnd` version | `v0.8.2`
Ethereum Axelar Gateway contract address | `not yet available`
Ethereum AXL token address | `not yet available`
Ethereum UST token address | `not yet available`
Ethereum LUNA token address | `not yet available`
Avalanche Axelar Gateway contract address | `not yet available`
Avalanche AXL token address | `not yet available`
Avalanche UST token address | `not yet available`
Avalanche LUNA token address | `not yet available`
Fantom Axelar Gateway contract address | `not yet available`
Fantom AXL token address | `not yet available`
Fantom UST token address | `not yet available`
Fantom LUNA token address | `not yet available`
Polygon Axelar Gateway contract address | `not yet available`
Polygon AXL token address | `not yet available`
Polygon UST token address | `not yet available`
Polygon LUNA token address | `not yet available`
Moonbeam Axelar Gateway contract address | `not yet available`
Moonbeam AXL token address | `not yet available`
Moonbeam UST token address | `not yet available`
Moonbeam LUNA token address | `not yet available`
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