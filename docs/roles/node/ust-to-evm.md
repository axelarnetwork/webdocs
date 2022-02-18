# Send UST to an EVM chain

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Transfer UST tokens from Terra to an EVM chain using the terminal.

:::danger

The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

:::
## Prerequisites

- Skill level: intermediate
- Prerequisites for [Send AXL to an EVM chain](axl-to-evm)

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>
</TabItem>
<TabItem value="testnet" label="Testnet">
</TabItem>
</Tabs>

## Send UST tokens from Terra to an EVM chain

Link your `{EVM_DEST_ADDR}` to a new temporary deposit address on Axelar:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uusd --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uusd --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

Output should contain
```
successfully linked {AXELAR_TEMP_ADDR} and {EVM_DEST_ADDR}
```

Send UST tokens from Terra to your temporary Axelar address `{AXELAR_TEMP_ADDR}` via IBC.

:::info

[TODO better instructions for IBC]

There are several ways to do IBC.

### IBC from a web wallet

Use a web wallet such as Keplr.  See [Transfer Terra assets to EVM chains using Satellite | Axelar Network](https://axelar.network/transfer-terra-assets-to-evm-chains-using-satellite).
### IBC from the terminal

You need shell access to a Terra node with at least `{AMOUNT}` balance of UST tokens in an account called `terra-validator`.
Get `{TERRA_TO_AXELAR_CHANNEL_ID}` from [Testnet resources](/releases/testnet) or [Mainnet resources](releases/mainnet).

```bash
terrad tx ibc-transfer transfer transfer {TERRA_TO_AXELAR_CHANNEL_ID} {AXELAR_TEMP_ADDR} --packet-timeout-timestamp 0 --packet-timeout-height "0-20000" {AMOUNT}uusd --gas-prices 0.15uusd --from terra-validator -y -b block
```

:::

Wait a few minutes for the IBC relayer to relay your transaction to Axelar.

:::note

Third-party monitoring tools will automatically complete the remaining steps of this process.

Wait a few minutes then check your Metamask for the UST tokens.  Don't forget to import the UST token into Metamask so you can see your balance as described in [Metamask for EVM chains](../user/metamask).

:::

:::caution

If you attempt the remaining steps while third-party monitoring tools are active then your commands are likely to conflict with third-party commands.  In this case you are likely to observe errors.  Deeper investigation might be needed to resolve conflicts and complete the transfer.

The remaining steps are needed only if there are no active third-party monitoring tools and you wish to complete the process manually.

:::

Verify the IBC transaction by checking the balances of `{AXELAR_TEMP_ADDR}` as per [Basic node management](basic.md).  Output should contain something like:

```
balances:
- amount: "15000000"
  denom: {IBC_DENOM}
```

:::note

You will not see `UST`, `uusd` or a similar token denomination for `{IBC_DENOM}`.  IBC token denominations look something like `ibc/6F4968A73F90CF7DE6394BF937D6DF7C7D162D74D839C13F53B41157D315E05F`

:::

Get `{IBC_DENOM}` from [Testnet resources](/releases/testnet) or [Mainnet resources](/releases/mainnet).

The remaining steps are similar to [Transfer AXL tokens from Axelar to an EVM chain using the terminal](axl-to-evm).

Confirm the deposit transaction.  Look for `{TX_HASH}` in the output of the previous command.

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet confirm-deposit {TX_HASH} {AMOUNT}"{IBC_DENOM}" {AXELAR_TEMP_ADDR} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet confirm-deposit {TX_HASH} {AMOUNT}"{IBC_DENOM}" {AXELAR_TEMP_ADDR} --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

Create and sign pending transfers for `{EVM_CHAIN}`.

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx evm create-pending-transfers {EVM_CHAIN} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core --gas auto --gas-adjustment 1.5

echo my-secret-password | ~/.axelar/bin/axelard tx evm sign-commands {EVM_CHAIN} --from validator --gas auto --gas-adjustment 1.2 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm create-pending-transfers {EVM_CHAIN} --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core --gas auto --gas-adjustment 1.5

echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm sign-commands {EVM_CHAIN} --from validator --gas auto --gas-adjustment 1.2 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

Output should contain

```
successfully started signing batched commands with ID {BATCH_ID}
```

:::note

If after performing the above steps you see the error `no commands to sign found` then check [this page](/reference/faq/ex5-problem) for detailed instructions on how to resolve it.

:::

Get the `execute_data`:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
~/.axelar/bin/axelard q evm batched-commands {EVM_CHAIN} {BATCH_ID}
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
~/.axelar_testnet/bin/axelard q evm batched-commands {EVM_CHAIN} {BATCH_ID}
```

</TabItem>
</Tabs>

Wait for `status: BATCHED_COMMANDS_STATUS_SIGNED` and copy the `execute_data`.

Use Metamask to send a transaction on `{EVM_CHAIN}` with the `execute_data` to the Axelar gateway contract address `{GATEWAY_ADDR}`.

:::danger

Post your transaction to the correct chain!  Set your Metamask network to `{EVM_CHAIN}`.  

:::

:::caution

Manually increase the gas limit to 5 million gas (5000000).  If you don't do this then the transaction will fail due to insufficient gas and you will not receive your tokens.

Before you click "confirm": select "EDIT", change "Gas Limit" to 5000000, and "Save"

:::

:::tip

[TODO refactor into "resources"]

Learn the Axelar `{GATEWAY_ADDR}` for `{EVM_CHAIN}` in two ways:
### 1. Documentation

[Testnet resources](/releases/testnet), [Mainnet resources](/releases/mainnet).
### 2. Terminal

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
~/.axelar/bin/axelard q evm gateway-address {EVM_CHAIN}
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
~/.axelar_testnet/bin/axelard q evm gateway-address {EVM_CHAIN}
```

</TabItem>
</Tabs>

:::

To send a transaction to `{GATEWAY_ADDR}` using Metamask: paste hex from `execute_data` above into "Hex Data" field.  (Do not send tokens!)

You should see `{AMOUNT}` of asset AXL in your `{EVM_CHAIN}` Metamask account.
    
Congratulations!  You have transferred AXL tokens from Axelar to an external EVM chain!
