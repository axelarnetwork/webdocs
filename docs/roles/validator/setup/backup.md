# Back-up your secret data

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Back-up your validator mnemonics and secret keys.

:::danger

The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

:::

You must store backup copies of the following data in a safe place:

1. `validator` account secret mnemonic
2. Tendermint validator secret key
3. `broadcaster` account secret mnemonic
4. `tofnd` secret mnemonic

Items 1 and 2 were created when you completed [Quick sync](../../node/join).

Items 3 and 4 were created when you completed [Launch validator companion processes for the first time](vald-tofnd.md).

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>
</TabItem>
<TabItem value="testnet" label="Testnet">
</TabItem>
</Tabs>

## Validator account secret mnemonic

BACKUP and DELETE the `validator` account secret mnemonic:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```
~/.axelar/validator.txt
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
~/.axelar_testnet/validator.txt
```

</TabItem>
</Tabs>

## Tendermint validator secret key

BACKUP but do NOT DELETE the Tendermint consensus secret key (this is needed on node restarts):

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```
~/.axelar/.core/config/priv_validator_key.json
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
~/.axelar_testnet/.core/config/priv_validator_key.json
```

</TabItem>
</Tabs>

## Broadcaster account secret mnemonic

BACKUP and DELETE the `broadcaster` account secret mnemonic:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```
~/.axelar/broadcaster.txt
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
~/.axelar_testnet/broadcaster.txt
```

</TabItem>
</Tabs>

## Tofnd secret mnemonic

BACKUP and DELETE the `tofnd` secret mnemonic:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```
~/.axelar/.tofnd/import
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
~/.axelar_testnet/.tofnd/import
```

</TabItem>
</Tabs>
