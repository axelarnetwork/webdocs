# Deploy a Cosmos token to any EVM chain

[TODO fix]

The new EVM chain has a gateway. It remains only to deploy a new ERC-20 token contract for each asset you wish to support on the new chain. In this example we will deploy contracts for AXL, UST, and LUNA tokens.

Create Axelar commands to deploy ERC-20 token contracts for AXL, UST, LUNA.

```bash
axelard tx evm create-deploy-token avalanche axelarnet uaxl "Axelar" AXL 6 0 10000000 --from controller
axelard tx evm create-deploy-token avalanche terra uusd "Axelar Wrapped UST" UST 6 0 10000000 --from controller
axelard tx evm create-deploy-token avalanche terra uluna "Axelar Wrapped LUNA" LUNA 6 0 100000 --from controller
```

Sign the above token deployment commands into a batch for the gateway.
This transaction does not need controller permission---you may sign it with any account, such as your node's `validator` account.

```bash
axelard tx evm sign-commands avalanche --from validator
```

Send the batched commands to the gateway contract on the new EVM chain just like any other batch as described in [Send AXL to an EVM chain](dev/cli/axl-to-evm.md). [TODO refactor batch command deployment into a self-contained doc]

- Note the `{EVM_TOKEN_TX_HASH}` for the transaction.

Wait until the transaction `{EVM_TOKEN_TX_HASH}` has received enough block confirmations on the EVM chain. (This number was set in the `confirmation_height` in the file `evm-chain.json` when you executed `add-chain`.)

For each token call a validator vote to confirm deployment of the ERC-20 contract.

```bash
axelard tx evm confirm-erc20-token avalanche axelarnet uaxl {EVM_TOKEN_TX_HASH} --from controller
axelard tx evm confirm-erc20-token avalanche terra uusd {EVM_TOKEN_TX_HASH} --from controller
axelard tx evm confirm-erc20-token avalanche terra uluna {EVM_TOKEN_TX_HASH} --from controller
```

Optional: check your logs for messages of the form `token XXX deployment confirmation result on chain avalanche is true`.
