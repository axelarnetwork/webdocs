# Develop on your Local Machine

We've developed a tool called [Axelar Local Development Environment](https://github.com/axelarnetwork/axelar-local-dev) to help you start developing a cross-chain dapp on your local machine very easily. It provides you a set of utility functions including:

1. A function to create an evm-based blockchain
2. A function to deploy a smart contract
3. A function to relay all pending commands from source chain to the destination chain.

A detailed functionality is provided [here](https://github.com/axelarnetwork/axelar-local-dev).

Now, we have all the functions we need to develop the application on our local machine. Next, let's see how can we use the tool.

## Getting Started

To make thing easier, we create a very simple project [here](https://github.com/axelarnetwork/axelar-local-dev-sample). It provides a simple script to send token from one chain to other chain. So let's try to run it.

1. Clone the project.

```
git clone https://github.com/axelarnetwork/axelar-local-dev-sample.git
```

2. Run `npm i` to install dependencies and compile all contracts inside `@axelar-network/axelar-local-dev`.

> Note: Your node version must be >= 16, otherwise you will get an error during `npm i` command.

3. Run `npm run start` to run the script.

If everything works correctly, you'll see the output similar below:

```
==== Preparing chain1... ====
Creating Chain 1 with a chainId of 2500...
Deploying the Axelar Gateway for Chain 1... Deployed at 0x7a852C4F4ecc07164365B0def5F37b44B085C558
Deploying Axelar Wrapped UST for Chain 1... Deployed at 0x9Dda7EcFB7C72B079bf64CDDd5e6dB995F6c5b0C

==== Preparing chain2... ====
Creating Chain 2 with a chainId of 2501...
Deploying the Axelar Gateway for Chain 2... Deployed at 0x7a852C4F4ecc07164365B0def5F37b44B085C558
Deploying Axelar Wrapped UST for Chain 2... Deployed at 0x9Dda7EcFB7C72B079bf64CDDd5e6dB995F6c5b0C

==== Initial balances ====
user1 has 1000 UST.
user2 has 0 UST.

==== After cross-chain balances ====
user1 has 900 UST.
user2 has 100 UST.
```

Great! Now, you successfully sent token cross-chain. You can read full source code at [src/send-token.js](https://github.com/axelarnetwork/axelar-local-dev-sample/blob/main/src/send-token.js)

## Deploy a contract

The general message passing can do much more than that, so we'll see how to deploy a custom destination contract.
