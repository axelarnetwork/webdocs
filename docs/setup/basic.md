# Basic management of your Axelar node

Stop your node, backup your chain data, resume your node.  Check your AXL balance, get AXL tokens from the faucet, send AXL tokens.

## Prerequisites

You have launched your Axelar node as per [Join the Axelar network for the first time](join.md).  Perhaps you have not yet completed downloading the blockchain.

## Stop your Axelar node

Stop your currently running Axelar node:

**Docker only:**
```bash
docker stop axelar-core
```

**Binary only:**
```bash
kill -9 $(pgrep -f "axelard start")
```

## Backup your chain data

!> :fire: Your node must be stopped in order to properly backup chain data.

```bash
cp -r ~/.axelar_testnet ~/.axelar_testnet_backup
```

## Resume your Axelar node

Resume your stopped Axelar node.

> [!TIP] If your node is still in `catching_up` mode then you might need to use the `-a` flag in the following command to specify a different version of axelar-core depending on your current progress downloading the blockchain.  See [Join the Axelar testnet for the first time](join.md).

**Docker only:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -e docker
```

**Binary only:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -e host
```

## Learn your address

> [!TIP] A new account named `validator` was automatically created for you when you joined the Axelar network for the first time.  This is just a name---you are not (yet) a validator on the Axelar network.

Learn the address of your `validator` account:

**Docker only:**
```bash
docker exec axelar-core sh -c 'echo my-secret-password | axelard keys show validator -a'
```

**Binary only:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard keys show valiator -a --home ~/.axelar_testnet/.core
```

## Check your AXL balance

Let `{MY_ADDRESS}` denote the address of your `validator` account.

**Docker only:**
```bash
docker exec axelar-core sh -c 'echo my-secret-password | axelard q bank balances {MY_ADDRESS}'
```

**Binary only:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard q bank balances {MY_ADDRESS} --home ~/.axelar_testnet/.core
```

If this is a new account then you should see no token balances:
```
balances: []
pagination:
  next_key: null
  total: "0"
```

## Testnet only: send AXL tokens

!> :fire: Do not attempt this task on Axelar mainnet unless you know what you are doing.  If you send mainnet AXL tokens to an address that you do not control then those tokens might become permanently lost.

> [!NOTE] You must have a nonzero balance of `AXL` tokens at your address to complete this task.
>
> Get free AXL testnet tokens sent to `{MY_ADDRESS}` from the [Axelar Testnet Faucet](https://faucet.testnet.axelar.dev/).

Send 1 `AXL` token to `{YOUR_ADDRESS}`:

**Docker only:**
```bash
docker exec axelar-core sh -c 'echo my-secret-password | axelard tx bank send {MY_ADDRESS} {YOUR_ADDRESS} 1000000uaxl'
```

**Binary only:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx bank send {MY_ADDRESS} {YOUR_ADDRESS} 1000000uaxl --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

> [!TIP] `AXL` token amounts are typically denominated in `uaxl` where `1 AXL = 1000000uaxl`.
