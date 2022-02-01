# Transfer AXL to EVM chains and back

Transfer AXL tokens from Axelar to EVM-compatible chains and back using the terminal.

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- Skill level: intermediate
- You have downloaded the Axelar blockchain and are comfortable with basic node management as per [Setup instructions](/parent-pages/setup.md).
- Your Axelar node has an account named `validator` that you control.  Let `{VALIDATOR_ADDR}` denote the address of your `validator` account.
- Select an EVM chain `{EVM_CHAIN}` from: Ethereum, Avalanche, Fantom, Moonbeam, Polygon.
- Complete steps from [Metamask for EVM chains](/resources/metamask.md) to connect your Metamask to `{EVM_CHAIN}`.
- You need both AXL tokens and `{EVM_CHAIN}` tokens to pay transaction fees.
    - **Testnet:**
        - Get some `{EVM_CHAIN}` testnet tokens as per [Metamask for EVM chains](/resources/metamask.md).
        - Get some AXL testnet tokens from the [Axelar testnet faucet](http://faucet.testnet.axelar.dev/).
    - **Mainnet:** You are responsible for obtaining your own tokens.
- `{EVM_DEST_ADDR}` is an address controlled by you on the external EVM chain `{EVM_CHAIN}`.  (In your Metamask, for example.)  This is where your AXL tokens will be sent.
- `{AMOUNT}` is the amount of AXL tokens you wish to transfer, denominated in `uaxl`.  Recall that `1 AXL = 1000000 uaxl`.  See [Testnet releases](/resources/testnet-releases.md) or [Mainnet releases](/resources/mainnet-releases.md) for minimum transfer amounts.

## Send tokens from Axelar to an EVM chain

Optional: Verify that your `validator` account has sufficient balance as per [Basic management of your Axelar node](/setup/basic.md).

Create a temporary deposit address on Axelar:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Output should contain
```
successfully linked {AXELAR_TEMP_ADDR} and {EVM_DEST_ADDR}
```

Optional: query your new `{AXELAR_TEMP_ADDR}`:

```bash
~/.axelar_testnet/bin/axelard q nexus latest-deposit-address axelarnet {EVM_CHAIN} {EVM_DEST_ADDR}
```

Send `{AMOUNT}` of `uaxl` to the new `{AXELAR_TEMP_ADDR}`.

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx bank send validator {AXELAR_TEMP_ADDR} {AMOUNT}uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx bank send validator {AXELAR_TEMP_ADDR} {AMOUNT}uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

That's all!

Wait a few minutes for the process to complete.  Then check your Metamask for the AXL tokens.  Don't forget to import the AXL token into Metamask so you can see your balance as described in [Metamask for EVM chains](/resources/metamask.md).

Congratulations!  You have transferred AXL tokens from Axelar to an external EVM chain!

## Redeem tokens from an EVM chain back to Axelar

Create a temporary deposit address on the EVM chain:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm link {EVM_CHAIN} axelarnet {VALIDATOR_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx evm link {EVM_CHAIN} axelarnet {VALIDATOR_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Output should contain

```
successfully linked {EVM_TEMP_ADDR} and {VALIDATOR_ADDR}
```

Optional: query your new `{EVM_TEMP_ADDR}`:

```bash
~/.axelar_testnet/bin/axelard q nexus latest-deposit-address axelarnet {EVM_CHAIN} {VALIDATOR_ADDR}
```

Use Metamask to send your wrapped AXL tokens on `{EVM_CHAIN}` to the new temporary deposit address `{EVM_TEMP_ADDR}`.

That's all!

Wait a few minutes for the process to complete.  Some EVM chains might take more time than others to allow for sufficient block confirmations.

Then check your AXL balance as per [Basic management of your Axelar node](/setup/basic.md).

Congratulations!  You have transferred AXL tokens from the external EVM chain back to Axelar!
