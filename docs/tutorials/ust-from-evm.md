# Redeem UST tokens from an EVM chain to Terra using the terminal

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- Skill level: intermediate
- Prerequisites for [Transfer UST tokens from Terra to an EVM chain using the terminal](/tutorials/ust-to-evm)

## Redeem AXL tokens from an EVM chain

# TODO old notes

## Send back to Terra
1. Create a deposit address on evm compatible chain
```bash
axelard tx evm link [chain] terra [terra address] uusd --from [key-name]
```
e.g.
```bash
axelard tx evm link ethereum terra terra1syhner2ldmm7vqzkskcflaxl6wy9vn7m873vqu uusd --from validator
```
Look for `successfully linked [Ethereum Ropsten deposit address] and [Terra address]`

2. External: send wrapped tokens to [Ethereum Ropsten deposit address] (e.g. with Metamask). You need to have some Ropsten testnet Ether on the address to send the transaction. Wait for 30 block confirmations. You can monitor the status of your deposit using the testnet explorer: https://ropsten.etherscan.io/

3. Confirm the transaction
```bash
axelard tx evm confirm-erc20-deposit [chain] [txID] [amount] [deposit address] --from [key-name]
```
Here, amount should be specific in uusd, 1UST = 1000000uusd
e.g.,
```bash
axelard tx evm confirm-erc20-deposit ethereum 0xb82e454a273cb32ed45a435767982293c12bf099ba419badc0a728e731f5825e 1000000 0x5CFEcE3b659e657E02e31d864ef0adE028a42a8E --from validator
```

Wait for transaction to be confirmed.
You can search it using:
- If using docker, `docker logs -f axelar-core 2>&1 | grep -a -e "deposit confirmation"`
- If using the binary, `tail -f $HOME/.axelar_testnet/logs/axelard.log | grep -a -e "deposit confirmation"`

4. Route pending IBC transfer on Axelar Network
```bash
axelard tx axelarnet route-ibc-transfers --from [key-name] --gas auto --gas-adjustment 1.2
```
Wait ~30-60 secs for the relayer to relay your transaction.

5. Switch back to terminal with terrad installed, verify you received ust

 [terra-address] is the address you used above
 ```bash
terrad q bank balances [terra-address]
```
