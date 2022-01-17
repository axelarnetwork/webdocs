# Join the Axelar testnet

To participate in the Axelar network, you set up a client that communicates with other peers and validators over the Axelar protocol. 

You can run this client on your computer or in a hosted Docker container. 

!> :fire: The Axelar Network is under development. **Do not transfer any real assets over the Axelar testnet.** Only use testnet tokens that you're not afraid to lose. Axelar is not responsible for any assets lost, frozen, or unrecoverable in any state or condition. If you find a problem, please [submit an issue](https://github.com/axelarnetwork/webdocs/issues) to this repository.


## Requirements and expectations

- **Time required** 
    - **Development** -- 45 minutes 
    - **Blockchain sync** -- 2-4 hours 
- **Deployment options** 
    - **Docker**
    - **Binaries**

### Prerequisites

Here are the prerequisites for both setup methods. You only need to install Docker of that's the setup method you want to use. 

|  |  | 
|:--|:--|
| OS | Mac OS or Ubuntu (tested on 18.04) |
| Architectures | arm64 and amd64 | 
| Container (for Docker setup) | [Docker](https://docs.docker.com/engine/install/). | 
| CLI tools | [`jq`](https://stedolan.github.io/jq/) (`apt-get install jq` on Ubuntu, `brew install jq` on Mac OS) | 
| Hardware | 4 cores, 8-16GB RAM, 512 GB drive. Recommended 6-8 cores, 16-32 GB RAM, 1 TB+ drive. | 
| Testnet faucet | [Axelar faucet](http://faucet.testnet.axelar.dev/). You need to fund your node through the faucet to connect to the network.  | 

#### Docker images

See [Testnet Releases](/resources/testnet-releases.md) for the latest available versions of the docker images:

- [`axelar-core`](https://hub.docker.com/repository/docker/axelarnet/axelar-core) 
- [`tofnd`](https://hub.docker.com/repository/docker/axelarnet/tofnd) 

You can save the latest version and to variables:

```bash
AXELAR_CORE_VERSION=$(curl -s https://raw.githubusercontent.com/axelarnetwork/axelarate-community/main/documentation/docs/resources/testnet-releases.md  | grep axelar-core | cut -d \` -f 4)
echo ${AXELAR_CORE_VERSION}
```

#### Docker logs

Docker writes log output to `stdout` and `stderr` by default. 

For easier debugging and error reporting, you can redirect Docker to write the logs to another file. For example, to write to `testnet.log`: 

```bash
docker logs -f axelar-core 2&> testnet.log
```

To monitor the log file in real time, open a new terminal window and run:

```bash
tail -f testnet.log
```

To filter the log to make finding relevant information easier, run:

```bash
docker logs -f axelar-core 2>&1 | grep -a -e threshold -e num_txs -e proxies
```

### Ethereum accounts

You don't need an Ethereum account for your initial setup and connection the Axelar network.

However, Axelar signs meta transactions for Ethereum, which means that any Ethereum account can send transaction executing commands so long as the commands are signed by Axelar's key. In the [exercises](https://docs.axelar.dev/#/parent-pages/exercises), all of the Ethereum-related transactions are sent from address `0xE3deF8C6b7E357bf38eC701Ce631f78F2532987A` on Ropsten testnet.



## Connect to the testnet 

To use Axelar's scripts and configuration templates, follow these steps:

1. Clone the [`axelerate-community`](https://github.com/axelarnetwork/axelarate-community) repo to use the scripts and configs:

        git clone https://github.com/axelarnetwork/axelarate-community.git
        cd axelarate-community

2. Checkout the tag that matches the cloned repo to ensure the scripts work with the deployment. Find the right tag at [Testnet Releases](/resources/testnet-releases.md).

        git checkout <release-tag>


3. Update the configuration with your public IP address. In the `join/config.toml` file, add your IP address to the `external_address` field, for example:

        external_address = "123.123.123.123:26656"

    If you don't know your public IP address, you can use [this site](https://whatismyipaddress.com/) to help find it. 
    
4. Set up port forwarding on your router. Axelar recommends forwarding ports `1317`, `26656`-`26658` and `26660`.

5. Join the Axelar network by running running `join/join-testnet.sh`. The script creates a validator address and keypair as well as a mnemonic phrase. Store the phrase in a safe place--it's the only way to recover your account if you forget your password. 

6. Monitor the progress of the network synch. Catching your node up to the network can take a few minutes. You can check the progress in a few ways, depending on your setup method. You can also use cURL. 

  - **Docker**

      docker logs -f axelar-core
  
  - **Binaries**

      tail -f $HOME/.axelar_testnet/logs/axelard.log
  
  Your logs are written to `<ROOT_DIRECTORY>/logs` where `<ROOT_DIRECTORY>` is the path you passed through the `-r` flag when you ran the setup script (`/join/join-testnet-with-binaries.sh`).

  - **cURL**

      curl localhost:26657/status | jq '.result.sync_info'      

  Your node has caught up to the network when the `catching_up` field in the response is `true`.

7. Prepare for the Axelar node. 

  - **Docker** -- Open a new terminal window and enter the Axelar node: 

      docker exec -it axelar-core sh

  - **Binaries** -- Add `$HOME/.axelar_testnet/bin` to your path (the location of the `bin` directory differs depending on your root directory) or use the full path to run the executable. Set the `AXELARD_CHAIN_ID` environment variable to `axelar-testnet-toronto`, then run `export AXELARD_CHAIN_ID=axelar-testnet-toronto`.

8. Find the address of `validator` account on the node. Every node has a an account called `validator` by default--these are not yet validators on the network. 

  - **Docker**

      axelard keys show validator -a

  - **Binaries** 

      $HOME/.axelar_testnet/bin/axelard keys show validator -a --home ~/.axelar_testnet/.core

9. Go to the Axelar [testnet faucet](http://faucet.testnet.axelar.dev/) and fund the `validator` account. 

10. Confirm that the account received the funds. Use the output from step 8 for the `VALIDATOR_ACCOUNT_ADDRESS` value. You have to wait for the node to fully sync with the network to see the testnet balances reflected in the account. 

  - **Docker**

      axelard q bank balances <VALIDATOR_ACCOUNT_ADDRESS>

  - **Binaries** 

      $HOME/.axelar_testnet/bin/axelard q bank balances <VALIDATOR_ACCOUNT_ADDRESS> --home ~/.axelar_testnet/.core

11. Stop the node:

  - **Docker** -- You can leave the Axelar node CLI by entering `exit` or `Ctrl + D`. To stop the node, enter a new CLI terminal and run the following command. This stops all currently running containers. If you want to stop a single container, run `docker stop <CONTAINER_ID>`.

      docker stop $(docker ps -a -q)
  
  Run `docker exec -it axelar-core sh` to enter the CLI again. 

  - **Binaries** 

      killall axelard
  

  To restart the node, run the `join/join-testnet.sh` script again, with the same `--axelar-core version` (and optionally `--root`) parameters as before. Do **NOT** use the `--reset-chain` flag--if you do, your node has to sync again from the beginning and any keys you haven't backed up are lost.

## Axelar processs and containers

### Docker


Axelar runs up to three docker containers. It only runs all three processes for validators. If you're not running a validator, Axelar only needs the `axelar-core` container.

- `axelar-core` -- Runs the core consensus engine.

- `vald` -- Broadcasts chain event transactions. 

- `tofnd` -- Handles threshold crypto operations.

You can stop or remove these containers by running:

```bash
docker stop axelar-core vald tofnd
```

If you see an error related to insufficient gas at any point during the workflow, add these flags:

```bash
--gas=auto --gas-adjustment 1.2
```

### Binaries

Axelar runs up to three unique processes. It only runs all three processes for validators. If you're not running a validator, Axelar only runs `axelar-core`.

- `axelar-core` -- Runs the core consensus engine.

  To kill this process:

      kill -9 $(pgrep -f 'axelard start')

- `vald` -- Broadcasts chain event transactions. 

  To kill this process:

      kill -9 $(pgrep -f 'axelard vald-start')

- `tofnd` -- Handles threshold crypto operations.

  To kill this process:

      kill -9 $(pgrep tofnd)

