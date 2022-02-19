# Register broadcaster proxy

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Axelar validators exchange messages with one another via the Axelar blockchain.  Each validator sends these messages from a separate `broadcaster` account.

:::caution

A validator can only register one `broadcaster` address throughout its lifetime.  This `broadcaster` address cannot be changed after it has been registered.  If you need to register a different proxy address then you must also create an entirely new validator.

:::

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>
</TabItem>
<TabItem value="testnet" label="Testnet">
</TabItem>
</Tabs>

## Learn your broadcaster account address

Your `broadcaster` address `{BROADCASTER_ADDR}` is stored in a text file:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```
~/.axelar/broadcaster.address
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
~/.axelar_testnet/broadcaster.address
```

</TabItem>
</Tabs>

## Fund your broadcaster account

**Testnet:**
Go to [Axelar faucet](http://faucet.testnet.axelar.dev/) and send some free AXL testnet tokens to `{BROADCASTER_ADDR}`.

## Register your broadcaster account

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```
echo my-secret-password | ~/.axelar/bin/axelard tx snapshot register-proxy {BROADCASTER_ADDR} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx snapshot register-proxy {BROADCASTER_ADDR} --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

## Optional: check your broadcaster registration

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard q snapshot proxy $(cat ~/.axelar_testnet/validator.bech)
```
