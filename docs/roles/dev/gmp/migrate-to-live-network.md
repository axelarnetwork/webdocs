# Migrate to live network

If you have everything works on your local, migrate to live network is simple. Follow the steps below to get your application ready on the live network.

## 1. Redeploy your smart contract to live network

Instead deploying a contract on the local network, we can deploy the contract on live network by this way:

### 1. Import a deployer wallet

```
// code here
```

### 2. Deploy a contract

What you'll need is the gateway contract address which are available here: [hacknet](../../../releases/hacknet), [testnet](../../../releases/testnet), and [mainnet](../../../releases/mainnet)

```
// code here
```

Or you can choose your preferred tool to deploy a contract e.g. `hardhat`, `foundry`, etc. to the live network.

## 2. Remove relay function

Now, you don't need to relay your transaction anymore. Our network will handle all incoming transaction from the source chain and execute your contract at the destination chain automatically.

## TODO
