# Basic node management

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Stop your node, backup your chain data, resume your node.  Check your AXL balance, get AXL tokens from the faucet.

:::danger

The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

:::
## Prerequisites

You have launched your Axelar node as per [Quick sync](join).  Perhaps you have not yet completed downloading the blockchain.

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>
</TabItem>
<TabItem value="testnet" label="Testnet">
</TabItem>
</Tabs>

## Stop your Axelar node

Stop your currently running Axelar node:

```bash
kill -9 $(pgrep -f "axelard start")
```

## Backup your chain data

:::caution

Your node must be stopped in order to properly backup chain data.

:::

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
cp -r ~/.axelar ~/.axelar_mainnet_backup
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
cp -r ~/.axelar_testnet ~/.axelar_testnet_backup
```

</TabItem>
</Tabs>

## Resume your Axelar node

Resume your stopped Axelar node.

:::tip

If your node is still in `catching_up` mode then you might need to use the `-a` flag in the following command to specify a different version of axelar-core depending on your current progress downloading the blockchain.  See [Join the Axelar testnet for the first time](join.md).

:::

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -n mainnet
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh
```

</TabItem>
</Tabs>

## Learn your address

:::tip

A new account named `validator` was automatically created for you when you joined the Axelar network for the first time.  This is just a name---you are not (yet) a validator on the Axelar network.

:::

Learn the address of your `validator` account:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard keys show validator -a --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard keys show validator -a --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

## Check your AXL balance

Let `{MY_ADDRESS}` denote the address of your `validator` account.

:::tip

Your balance will appear only after you have downloaded the blockchain and exited `catching_up` mode.

:::

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard q bank balances {MY_ADDRESS} --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard q bank balances {MY_ADDRESS} --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

If this is a new account then you should see no token balances.

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>
</TabItem>
<TabItem value="testnet" label="Testnet">

## Get AXL tokens from the faucet

Get free AXL testnet tokens sent to `{MY_ADDRESS}` from the [Axelar Testnet Faucet](https://faucet.testnet.axelar.dev/).

Check your balance again to see the tokens you received from the faucet.

</TabItem>
</Tabs>
