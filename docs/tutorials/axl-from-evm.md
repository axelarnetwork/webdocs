# Redeem AXL tokens from an EVM chain to Axelar using the terminal

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- Skill level: intermediate
- Prerequisites for [Transfer AXL tokens from Axelar to an EVM chain using the terminal](/tutorials/axl-to-evm)

## Redeem AXL tokens from an EVM chain

Link your Axelar `validator` account to a new temporary deposit address on the EVM chain:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm link {EVM_CHAIN} axelarnet {VALIDATOR_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
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

**Testnet:**
```bash
~/.axelar_testnet/bin/axelard q nexus latest-deposit-address {EVM_CHAIN} axelarnet {VALIDATOR_ADDR}
```

**Mainnet:**
```bash
~/.axelar/bin/axelard q nexus latest-deposit-address {EVM_CHAIN} axelarnet {VALIDATOR_ADDR}
```

Use Metamask to send some wrapped AXL tokens on `{EVM_CHAIN}` to the new temporary deposit address `{EVM_TEMP_ADDR}`.  Save the transaction hash `{EVM_TX_HASH}` for later.

!> :fire: Send only `Axelar` ERC20 tokens to `{EVM_TEMP_ADDR}`.  Any other token sent to `{EVM_TEMP_ADDR}` will be lost.

> [!NOTE]
> Third-party monitoring tools will automatically complete the remaining steps of this process.
>
> Wait a few minutes then check your Axelar `validator` account AXL token balance as per [Basic management of your Axelar node](/setup/basic.md).

!> If you attempt the remaining steps while third-party monitoring tools are active then your commands are likely to conflict with third-party commands.  In this case you are likely to observe errors.  Deeper investigation might be needed to resolve conflicts and complete the transfer.
!>
!> The remaining steps are needed only if there are no active third-party monitoring tools and you wish to complete the process manually.

Do not proceed to the next step until you have waited for sufficiently many block confirmations on the EVM chain.  Block confirmation minimums can be found at [Testnet resources](https://docs.axelar.dev/#/resources/testnet-releases), [Mainnet resources](https://docs.axelar.dev/#/resources/mainnet-releases).

Confirm the EVM chain transaction on Axelar.

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm confirm-erc20-deposit {EVM_CHAIN} {EVM_TX_HASH} {AMOUNT} {EVM_TEMP_ADDR} --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx evm confirm-erc20-deposit {EVM_CHAIN} {EVM_TX_HASH} {AMOUNT} {EVM_TEMP_ADDR} --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Wait for confirmation on Axelar.

Optional: Search the axelar-core logs for confirmation:

**Testnet:**
```
tail -f ~/.axelar_testnet/logs/axelard.log | grep -a -e "deposit confirmation"
```

**Mainnet:**
```
tail -f ~/.axelar/logs/axelard.log | grep -a -e "deposit confirmation"
```

Create and sign pending transfers for `{EVM_CHAIN}`.

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm create-burn-tokens {EVM_CHAIN} --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core --gas auto --gas-adjustment 1.5

echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm sign-commands {EVM_CHAIN} --from validator --gas auto --gas-adjustment 1.2 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx evm create-burn-tokens {EVM_CHAIN} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core --gas auto --gas-adjustment 1.5

echo my-secret-password | ~/.axelar/bin/axelard tx evm sign-commands {EVM_CHAIN} --from validator --gas auto --gas-adjustment 1.2 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Output should contain

```
successfully started signing batched commands with ID {BATCH_ID}
```

> [!NOTE|label:Troubleshoot]
> If after performing the above steps you see the error `no commands to sign found` then check [this page](/faqs/ex5-problem.md) for detailed instructions on how to resolve it.

Get the `execute_data`:

**Testnet:**
```bash
~/.axelar_testnet/bin/axelard q evm batched-commands {EVM_CHAIN} {BATCH_ID}
```

**Mainnet:**
```bash
~/.axelar/bin/axelard q evm batched-commands {EVM_CHAIN} {BATCH_ID}
```

Wait for `status: BATCHED_COMMANDS_STATUS_SIGNED` and copy the `execute_data`.

Use Metamask to send a transaction on `{EVM_CHAIN}` with the `execute_data` to the Axelar gateway contract address `{GATEWAY_ADDR}`.

!> Post your transaction to the correct chain!  Set your Metamask network to `{EVM_CHAIN}`.  

!> Manually increase the gas limit to 5 million gas (5000000).  If you don't do this then the transaction will fail due to insufficient gas and you will not receive your tokens.
!>
!> Before you click "confirm": select "EDIT", change "Gas Limit" to 5000000, and "Save"

> [!TIP]
> Learn the Axelar `{GATEWAY_ADDR}` for `{EVM_CHAIN}` in two ways:
>
> ### 1. Documentation
> [Testnet resources](https://docs.axelar.dev/#/resources/testnet-releases), [Mainnet resources](https://docs.axelar.dev/#/resources/mainnet-releases).
>
> ### 2. Terminal
> **Testnet:**
> ```bash
> ~/.axelar_testnet/bin/axelard q evm gateway-address {EVM_CHAIN}
> ```
> 
> **Mainnet:**
> ```bash
> ~/.axelar/bin/axelard q evm gateway-address {EVM_CHAIN}
> ```

To send a transaction to `{GATEWAY_ADDR}` using Metamask: paste hex from `execute_data` above into "Hex Data" field.  (Do not send tokens!)

Optional: Check your Axelar `validator` account AXL token balance as per [Basic management of your Axelar node](/setup/basic.md) so that you can observe balance change.

Execute the pending transfer:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet execute-pending-transfers --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet execute-pending-transfers --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

You should see the redeemed `{AMOUNT}` of AXL token (minus transaction fees) in your Axelar `validator` account.

Congratulations!  You have redeemed AXL tokens from the external EVM chain back to Axelar!
