# Join the Axelar network for the first time

Start your Axelar node and download the blockchain.

[TODO add mainnet]

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

> [!NOTE] Choose to run your Axelar node in docker mode or binary mode.
>
> Look for **Docker only:** or **Binary only:** for instructions specific to your chosen mode.

## Prerequisites

* **Operating system:**  MacOS or Ubuntu (tested on 18.04)
* **Hardware:** 4 cores, 8-16GB RAM, 512 GB drive, arm64 or amd64. Recommended 6-8 cores, 16-32 GB RAM, 1 TB+ drive.
* **Software:**
    * Install [`jq`](https://stedolan.github.io/jq/download/).
    * **Docker only:** Install [Docker](https://docs.docker.com/engine/install/).
    * **Binary only:** Increase the maximum number of open files on your system.  Example: `ulimit -n 16384`.  You may wish to add this command to your shell profile so that you don't need to execute it next time you restart your machine.

## Choose a keyring password

Your Axelar keyring is encrypted with a password you choose.  Your password must have at least 8 characters.

In what follows you will execute a shell script to join the Axelar testnet.  Your keyring password is supplied to the shell script via a `KEYRING_PASSWORD` environment variable.

!> In the following instructions you must substitute your chosen keyring password for `my-secret-password`.

## Join the Axelar testnet

Clone the [`axelerate-community`](https://github.com/axelarnetwork/axelarate-community) repo:

```bash
git clone https://github.com/axelarnetwork/axelarate-community.git
cd axelarate-community
```

Launch a new Axelar testnet node with version `0.10.7` of axelar-core:

**Docker only:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -e docker -a v0.10.7
```

**Binary only:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -e host -a v0.10.7
```

Your Axelar testnet node will launch and begin downloading the blockchain.

## Backup your secret keys

BACKUP and DELETE the `validator` account secret mnemonic:
```
~/.axelar_testnet/shared/validator.txt
```

BACKUP but do NOT DELETE the Tendermint consensus secret key (this is needed on node restarts):
```
~/.axelar_testnet/.core/config/priv_validator_key.json
```

## View logs

View the streaming logs for your Axelar testnet node:

In a new terminal window:

**Docker only:**
```bash
docker logs -f axelar-core
```

**Binary only:**
```bash
tail -f $HOME/.axelar_testnet/logs/axelard.log
```

## Switch your Axelar node version

Your Axelar testnet node will download the blockchain until it reaches block height 14700.  At that height you will see a panic in the logs:

```
panic: UPGRADE "v0.13" NEEDED at height: 14700: 
```

You need to launch the Axelar testnet node again with version `0.13.2` of axelar-core:

**Docker only:**
```bash
docker stop axelar-core && docker rm axelar-core
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -e docker
```

**Binary only:**
```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -e host
```

Your Axelar testnet node will launch and resume downloading the blockchain.

## Test whether your blockchain is downloaded

Eventually your Axelar testnet node will download the entire Axelar blockchain and exit `catching_up` mode.  At this time your logs should show a new block added to the blockchain every 5 seconds.

You can test whether your Axelar testnet node has exited `catching_up` mode:

```bash
curl localhost:26657/status | jq '.result.sync_info'
```

Look for the field `catching_up`:
* `true`: you are still downloading the blockchain.
* `false`: you have finished downloading the blockchain.

## Next steps

Congratulations!  You joined the Axelar network and downloaded the blockchain.

Learn what you can do with Axelar:

* [Basic management of your Axelar node](/setup/basic)
* Tutorial: transfer UST or LUNA tokens from the Terra blockchain to EVM-compatible blockchains such as Ethereum, Avalanche, Fantom, Moonbeam, Polygon.