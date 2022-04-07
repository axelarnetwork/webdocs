# Stake AXL tokens

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Stake AXL tokens on the Axelar network.

Choose an amount `{STAKE_AMOUNT}` of AXL tokens you wish to stake.  `{STAKE_AMOUNT}` is denominated in `uaxl` where `1 AXL = 1000000 uaxl`.

* You need at least 1 AXL to participate in consensus on the Axelar network
* You need enough stake to get into the "active set" of size 50: if 50 or more other validators have more stake than you then you cannot participate in consensus.
* Optional: you need at least 2% of total bonded stake to participate in multi-party cryptography protocols with other validators.

Choose a moniker `{MY_MONIKER}` for your validator.  There are many other parameters you may choose for your validator.  For simplicity these instructions specify default values for all other parameters.

Make your `validator` account into an Axelar validator by staking AXL tokens:

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>

```
echo my-secret-password | ~/.axelar/bin/axelard tx staking create-validator --amount {STAKE_AMOUNT}uaxl --moniker "{MY_MONIKER}" --commission-rate="0.10" --commission-max-rate="0.20" --commission-max-change-rate="0.01" --min-self-delegation="1" --pubkey="$(~/.axelar/bin/axelard tendermint show-validator --home ~/.axelar/.core)" --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx staking create-validator --amount {STAKE_AMOUNT}uaxl --moniker "{MY_MONIKER}" --commission-rate="0.10" --commission-max-rate="0.20" --commission-max-change-rate="0.01" --min-self-delegation="1" --pubkey="$(~/.axelar_testnet/bin/axelard tendermint show-validator --home ~/.axelar_testnet/.core)" --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

## Optional: Learn your valoper address

[TODO explain valoper vs normal addresses somewhere]

Learn the `{VALOPER_ADDR}` address associated with your `validator` account

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard keys show validator -a --bech val --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard keys show validator -a --bech val --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

## Optional: check the stake amount delegated to your validator

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
 ~/.axelar/bin/axelard q staking validator {VALOPER_ADDR} | grep tokens
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
 ~/.axelar_testnet/bin/axelard q staking validator {VALOPER_ADDR} | grep tokens
```

</TabItem>
</Tabs>

## Optional: delegate additional stake to your validator

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx staking delegate {VALOPER_ADDR} {STAKE_AMOUNT}uaxl --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx staking delegate {VALOPER_ADDR} {STAKE_AMOUNT}uaxl --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>
