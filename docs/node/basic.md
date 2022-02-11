# Basic management of your Axelar node

Stop your node, backup your chain data, resume your node.  Check your AXL balance, get AXL tokens from the faucet.

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

You have launched your Axelar node as per [Join the Axelar network for the first time](join.md).  Perhaps you have not yet completed downloading the blockchain.

## Stop your Axelar node

Stop your currently running Axelar node:

```bash
kill -9 $(pgrep -f "axelard start")
```

## Backup your chain data

!> Your node must be stopped in order to properly backup chain data.

**Testnet:**
```bash
cp -r ~/.axelar_testnet ~/.axelar_testnet_backup
```

**Mainnet:**
```bash
cp -r ~/.axelar ~/.axelar_mainnet_backup
```

## Resume your Axelar node

Resume your stopped Axelar node.

> [!TIP] If your node is still in `catching_up` mode then you might need to use the `-a` flag in the following command to specify a different version of axelar-core depending on your current progress downloading the blockchain.  See [Join the Axelar testnet for the first time](join.md).

**Testnet:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh
```

**Mainnet:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -n mainnet
```

## Learn your address

> [!TIP] A new account named `validator` was automatically created for you when you joined the Axelar network for the first time.  This is just a name---you are not (yet) a validator on the Axelar network.

Learn the address of your `validator` account:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard keys show validator -a --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard keys show validator -a --home ~/.axelar/.core
```

## Check your AXL balance

Let `{MY_ADDRESS}` denote the address of your `validator` account.

> [!TIP] Your balance will appear only after you have downloaded the blockchain and exited `catching_up` mode.

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard q bank balances {MY_ADDRESS} --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard q bank balances {MY_ADDRESS} --home ~/.axelar/.core
```

If this is a new account then you should see no token balances.

## Get AXL tokens from the faucet

Get free AXL testnet tokens sent to `{MY_ADDRESS}` from the [Axelar Testnet Faucet](https://faucet.testnet.axelar.dev/).

Check your balance again to see the tokens you received from the faucet.
