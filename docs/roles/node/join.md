# Quick sync (recommended)

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Start your Axelar node and download the blockchain.

:::danger

The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

:::

:::tip

These instructions syncronize your Axelar node quickly by downloading a recent snapshot of the blockchain.  If instead you prefer to syncronize your Axelar node using the Axelar peer-to-peer network then see [Genesis sync](join-genesis)

:::

## Prerequisites

* **Operating system:**  MacOS or Ubuntu (tested on 18.04)
* **Hardware:** 4 cores, 8-16GB RAM, 512 GB drive, arm64 or amd64. Recommended 6-8 cores, 16-32 GB RAM, 1 TB+ drive.
* **Software:**
    * Install [`jq`](https://stedolan.github.io/jq/download/).
    * Install `lz4`: [MacOS](https://formulae.brew.sh/formula/lz4) | [Ubuntu](https://snapcraft.io/install/lz4/ubuntu)
    * Increase the maximum number of open files on your system.  Example: `ulimit -n 16384`.  You may wish to add this command to your shell profile so that you don't need to execute it next time you restart your machine.

## Choose a keyring password

Your Axelar keyring is encrypted with a password you choose.  Your password must have at least 8 characters.

In what follows you will execute a shell script to join the Axelar network.  Your keyring password is supplied to the shell script via a `KEYRING_PASSWORD` environment variable.

:::caution

In the following instructions you must substitute your chosen keyring password for `my-secret-password`.

:::
## Join the Axelar network

Clone the [`axelerate-community`](https://github.com/axelarnetwork/axelarate-community) repo:

```bash
git clone https://github.com/axelarnetwork/axelarate-community.git
cd axelarate-community
```

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>
Launch a new Axelar mainnet node with version `0.10.7` of axelar-core:

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -a v0.10.7 -n mainnet
```

Your Axelar node will initialize your data folder `~/.axelar`
</TabItem>

<TabItem value="testnet" label="Testnet">
Launch a new Axelar testnet node with version `0.13.6` of axelar-core:

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -a v0.13.6
```

Your Axelar node will initialize your data folder `~/.axelar_testnet`
</TabItem>
</Tabs>

Then your Axelar node will begin downloading blocks in the blockchain one-by-one.

## Backup your secret keys

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

## View logs

View the streaming logs for your Axelar node:

In a new terminal window:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
tail -f ~/.axelar/logs/axelard.log
```

</TabItem>

<TabItem value="testnet" label="Testnet">

```bash
tail -f ~/.axelar_testnet/logs/axelard.log
```

</TabItem>
</Tabs>

You should see log messages for each block in the blockchain that your node downloads.

## Stop your node, delete your blockchain data

You will not download the entire blockchain in this way.  Instead you will stop your node and swap in a recent snapshot of the entire blockchain.

Stop your currently running Axelar node:

```bash
kill -9 $(pgrep -f "axelard start")
```

Delete your `data` directory:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
rm -r ~/.axelar/.core/data
```

</TabItem>

<TabItem value="testnet" label="Testnet">

```bash
rm -r ~/.axelar_testnet/.core/data
```

</TabItem>
</Tabs>

# Download the latest Axelar blockchain snapshot

Download the latest Axelar blockchain snapshot for your chosen network (testnet or mainnet) from a provider:

* [quicksync.io](https://quicksync.io/networks/axelar.html)
* [staketab.com](https://cosmos-snap.staketab.com/axelar/) | [instructions](https://github.com/staketab/nginx-cosmos-snap/blob/main/docs/axelar.md)

The following instructions assume you downloaded the `default` snapshot from `quicksync.io`.

Let `{SNAPSHOT_FILE}` denote the file name of the snapshot you downloaded.  Example file names:

* **Testnet:** `axelartestnet-lisbon-2-default.20220207.2240.tar.lz4`
* **Mainnet:** `axelar-dojo-1-default.20220207.2210.tar.lz4`

Decompress the downloaded snapshot into your `data` directory:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
lz4 -dc --no-sparse {SNAPSHOT_FILE} | tar xfC - ~/.axelar/.core
```

</TabItem>

<TabItem value="testnet" label="Testnet">

```bash
lz4 -dc --no-sparse {SNAPSHOT_FILE} | tar xfC - ~/.axelar_testnet/.core
```

</TabItem>
</Tabs>

## Resume your node

Resume your Axelar node with the latest version of axelar-core:

<Tabs groupId="network" className='hidden'>
<TabItem value="mainnet" label="Mainnet" default>

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -n mainnet
```

</TabItem>

<TabItem value="testnet" label="Testnet">

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -n testnet
```

</TabItem>
</Tabs>

Your Axelar node will launch and resume downloading the blockchain.  You should see log messages for new blocks.

## Test whether your blockchain is downloaded

Eventually your Axelar node will download the entire Axelar blockchain and exit `catching_up` mode.  At that time your logs will show a new block added to the blockchain every 5 seconds.

You can test whether your Axelar node has exited `catching_up` mode:

```bash
curl localhost:26657/status | jq '.result.sync_info'
```

Look for the field `catching_up`:
* `true`: you are still downloading the blockchain.
* `false`: you have finished downloading the blockchain.

## Next steps

Congratulations!  You joined the Axelar network and downloaded the blockchain.

Learn what you can do with Axelar:

* [Basic node management](basic)
* Tutorial: transfer UST or LUNA tokens from the Terra blockchain to EVM-compatible blockchains such as Avalanche, Ethereum, Fantom, Moonbeam, Polygon.
