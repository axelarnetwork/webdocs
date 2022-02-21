# Send AXL to an EVM chain

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Transfer AXL tokens from Axelar to an EVM chain using the terminal.

:::danger

The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

:::

## Prerequisites

- Skill level: intermediate
- You have downloaded the Axelar blockchain and are comfortable with [Basic node management](basic).
- Your Axelar node has an account named `validator` that you control.  Let `{VALIDATOR_ADDR}` denote the address of your `validator` account.
- Select an EVM chain `{EVM_CHAIN}` from: Ethereum, Avalanche, Fantom, Moonbeam, Polygon.
- Complete steps from [Metamask for EVM chains](../user/metamask) to connect your Metamask to `{EVM_CHAIN}`.
- You need both AXL tokens and `{EVM_CHAIN}` tokens to pay transaction fees.
    - **Testnet:**
        - Get some `{EVM_CHAIN}` testnet tokens as per [Metamask for EVM chains](../user/metamask).
        - Get some AXL testnet tokens from the [Axelar testnet faucet](http://faucet.testnet.axelar.dev/).
    - **Mainnet:** You are responsible for obtaining your own tokens.
- `{EVM_DEST_ADDR}` is an address controlled by you on the external EVM chain `{EVM_CHAIN}`.  (In your Metamask, for example.)  This is where your AXL tokens will be sent.
- `{AMOUNT}` is the amount of AXL tokens you wish to transfer, denominated in `uaxl`.  Recall that `1 AXL = 1000000 uaxl`.  See [Testnet releases](/releases/testnet) or [Mainnet releases](/releases/mainnet) for minimum transfer amounts.

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>
</TabItem>
<TabItem value="testnet" label="Testnet">
</TabItem>
</Tabs>

## Send AXL tokens from Axelar to an EVM chain

Optional: Verify that your `validator` account has sufficient balance as per [Basic node management](basic).

Link your `{EVM_DEST_ADDR}` to a new temporary deposit address on Axelar:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet link {EVM_CHAIN} {EVM_DEST_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

Output should contain
```
successfully linked {AXELAR_TEMP_ADDR} and {EVM_DEST_ADDR}
```

Optional: query your new `{AXELAR_TEMP_ADDR}`:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
~/.axelar/bin/axelard q nexus latest-deposit-address axelarnet {EVM_CHAIN} {EVM_DEST_ADDR}
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
~/.axelar_testnet/bin/axelard q nexus latest-deposit-address axelarnet {EVM_CHAIN} {EVM_DEST_ADDR}
```

</TabItem>
</Tabs>

Send `{AMOUNT}` of `uaxl` to the new `{AXELAR_TEMP_ADDR}`.

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx bank send validator {AXELAR_TEMP_ADDR} {AMOUNT}uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx bank send validator {AXELAR_TEMP_ADDR} {AMOUNT}uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

:::note

Third-party monitoring tools will automatically complete the remaining steps of this process.

Wait a few minutes then check your Metamask for the AXL tokens.  Don't forget to import the AXL token into Metamask so you can see your balance as described in [Metamask for EVM chains](../user/metamask).

:::

:::caution

If you attempt the remaining steps while third-party monitoring tools are active then your commands are likely to conflict with third-party commands.  In this case you are likely to observe errors.  Deeper investigation might be needed to resolve conflicts and complete the transfer.

The remaining steps are needed only if there are no active third-party monitoring tools and you wish to complete the process manually.

:::

Confirm the deposit transaction.  Look for `{TX_HASH}` in the output of the previous command.

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx axelarnet confirm-deposit {TX_HASH} {AMOUNT}uaxl {AXELAR_TEMP_ADDR} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx axelarnet confirm-deposit {TX_HASH} {AMOUNT}uaxl {AXELAR_TEMP_ADDR} --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
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
