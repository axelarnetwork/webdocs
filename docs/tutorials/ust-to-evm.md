# Transfer UST tokens from Terra to an EVM chain using the terminal

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- Skill level: intermediate
- Prerequisites for [Transfer AXL tokens from Axelar to an EVM chain using the terminal](/tutorials/axl-to-evm)

## Send UST tokens from Terra to an EVM chain

Link your `{EVM_DEST_ADDR}` to a new temporary deposit address on Axelar:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uusd --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uusd --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Output should contain
```
successfully linked {AXELAR_TEMP_ADDR} and {EVM_DEST_ADDR}
```

Send UST tokens from Terra to your temporary Axelar address `{AXELAR_TEMP_ADDR}` via IBC.

> [!INFO]
> [TODO better instructions for IBC]
>
> There are several ways to do IBC.
>
> ### IBC from a web wallet
>
> Use a web wallet such as Keplr.  See [Transfer Terra assets to EVM chains using Satellite | Axelar Network](https://axelar.network/transfer-terra-assets-to-evm-chains-using-satellite).
>
> ### IBC from the terminal
>
> You need shell access to a Terra node with at least `{AMOUNT}` balance of UST tokens in an account called `terra-validator`.
>
> Get `{TERRA_TO_AXELAR_CHANNEL_ID}` from [Testnet resources](https://docs.axelar.dev/#/resources/testnet-releases) or [Mainnet resources](https://docs.axelar.dev/#/resources/mainnet-releases).
>
> ```bash
> terrad tx ibc-transfer transfer transfer {TERRA_TO_AXELAR_CHANNEL_ID} {AXELAR_TEMP_ADDR} --packet-timeout-timestamp 0 --packet-timeout-height "0-20000" {AMOUNT}uusd --gas-prices 0.15uusd --from terra-validator -y -b block
> ```

Wait a few minutes for the IBC relayer to relay your transaction to Axelar.

> [!NOTE]
> Third-party monitoring tools will automatically complete the remaining steps of this process.
>
> Wait a few minutes then check your Metamask for the UST tokens.  Don't forget to import the UST token into Metamask so you can see your balance as described in [Metamask for EVM chains](/resources/metamask.md).

!> If you attempt the remaining steps while third-party monitoring tools are active then your commands are likely to conflict with third-party commands.  In this case you are likely to observe errors.  Deeper investigation might be needed to resolve conflicts and complete the transfer.
!>
!> The remaining steps are needed only if there are no active third-party monitoring tools and you wish to complete the process manually.

Verify the IBC transaction by checking the balances of `{AXELAR_TEMP_ADDR}` as per [Basic management of your Axelar node](/setup/basic.md).  Output should contain something like:

```
balances:
- amount: "15000000"
  denom: {IBC_DENOM}
```

> [!NOTE]
> You will not see `UST`, `uusd` or a similar token denomination for `{IBC_DENOM}`.  IBC token denominations look something like `ibc/6F4968A73F90CF7DE6394BF937D6DF7C7D162D74D839C13F53B41157D315E05F`

Get `{IBC_DENOM}` from [Testnet resources](https://docs.axelar.dev/#/resources/testnet-releases) or [Mainnet resources](https://docs.axelar.dev/#/resources/mainnet-releases).

The remaining steps are similar to [Transfer AXL tokens from Axelar to an EVM chain using the terminal](/tutorials/axl-to-evm.md).

Confirm the deposit transaction.  Look for `{TX_HASH}` in the output of the previous command.

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet confirm-deposit {TX_HASH} {AMOUNT}"{IBC_DENOM}" {AXELAR_TEMP_ADDR} --from validator --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet confirm-deposit {TX_HASH} {AMOUNT}"{IBC_DENOM}" {AXELAR_TEMP_ADDR} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Create and sign pending transfers for `{EVM_CHAIN}`.

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm create-pending-transfers {EVM_CHAIN} --from validator --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core --gas auto --gas-adjustment 1.5

echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm sign-commands {EVM_CHAIN} --from validator --gas auto --gas-adjustment 1.2 --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx evm create-pending-transfers {EVM_CHAIN} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core --gas auto --gas-adjustment 1.5

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

> [!TIP] [TODO refactor into "resources"]
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

You should see `{AMOUNT}` of asset AXL in your `{EVM_CHAIN}` Metamask account.
    
Congratulations!  You have transferred AXL tokens from Axelar to an external EVM chain!