# Transfer AXL to EVM chains and back

Transfer AXL tokens from Axelar to EVM-compatible chains and back using the terminal.

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- Skill level: intermediate
- You have downloaded the Axelar blockchain and are comfortable with basic node management as per [Setup instructions](/parent-pages/setup.md).
- Your Axelar node has an account named `validator` that you control.
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

Optional: check that your `validator` account has at least `{AMOUNT}` of `uaxl`:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard q bank balances $(echo my-secret-password | ~/.axelar_testnet/bin/axelard keys show validator -a --home ~/.axelar_testnet/.core) --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard q bank balances $(echo my-secret-password | ~/.axelar/bin/axelard keys show validator -a --home ~/.axelar/.core) --home ~/.axelar/.core
```

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

The Axelar network will notice your deposit to `{AXELAR_TEMP_ADDR}` and send `{AMOUNT}` AXL tokens (minus a transaction fee) to your address `{EVM_DEST_ADDR}` on `{EVM_CHAIN}`.

Wait a few minutes for the process to complete.  Then check your Metamask for the AXL tokens.  Don't forget to import the AXL token into Metamask so you can see your balance as described in [Metamask for EVM chains](/resources/metamask.md).

Congratulations!  You have transferred AXL tokens from Axelar to an external EVM chain!

# DONE TO HERE
## Redeem tokens from an EVM chain back to Axelar

1. Create a temporary deposit address on the EVM chain `{EVM_CHAIN}`.

    ```bash
    axelard tx evm link {EVM_CHAIN} axelarnet $(axelard keys show validator -a) uaxl --from validator
    ```

    Output should contain

    ```
    successfully linked [evm deposit address] and [axelar destination address]
    ```

2. Use Metamask to send your wrapped AXL tokens to the temporary deposit address `[evm deposit address]` on the EVM chain `{EVM_CHAIN}`.

    Do not proceed to the next step until you have waited for sufficiently many block confirmations on the EVM chain.  (Currently 35 blocks for Ethereum, 1 block for all other EVM chains.)

3. Confirm the EVM chain transaction on Axelar.
    * `[txhash]` is from the previous step
    * `[amount]` is just a number with no token denomination.  (Example: `1000000`)

    ```bash
    axelard tx evm confirm-erc20-deposit {EVM_CHAIN} [txhash] [amount] [evm deposit address] --from validator
    ```

    Example:

    ```bash
    axelard tx evm confirm-erc20-deposit ethereum 0xb82e454a273cb32ed45a435767982293c12bf099ba419badc0a728e731f5825e 1000000 0x5CFEcE3b659e657E02e31d864ef0adE028a42a8E --from validator
    ```

    Wait for transaction to be confirmed on Axelar.
    You can search it using `docker logs -f axelar-core 2>&1 | grep -a -e "deposit confirmation"`.

4. Execute pending deposit on Axelar and verify you received the tokens.

    First, check your balance on Axelar so you can compare after the deposit:

    ```bash
    axelard q bank balances $(axelard keys show validator -a)
    ```

    Then execute pending deposit:

    ```bash
    axelard tx axelarnet execute-pending-transfers --from validator --gas auto --gas-adjustment 1.2
    ```

    Then check your balance on Axelar again and compare with previous:

    ```bash
    axelard q bank balances $(axelard keys show validator -a)
    ```

    You should see the deposited token in your balance, minus transaction fees.

Congratulations!  You have transferred assets from the external EVM chain back to Axelar!
