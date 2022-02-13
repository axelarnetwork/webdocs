# Register broadcaster proxy
-----------

Axelar validators exchange messages with one another via the Axelar blockchain.  Each validator sends these messages from a separate `broadcaster` account.

!> A validator can only register one `broadcaster` address throughout its lifetime.  This `broadcaster` address cannot be changed after it has been registered.  If you need to register a different proxy address then you must also create an entirely new validator.

## Learn your broadcaster account address

Your `broadcaster` address `{BROADCASTER_ADDR}` is stored in a text file:

**Testnet:**
```
~/.axelar_testnet/broadcaster.address
```

**Mainnet:**
```
~/.axelar/broadcaster.address
```

## Fund your broadcaster account

**Testnet:**
Go to [Axelar faucet](http://faucet.testnet.axelar.dev/) and send some free AXL testnet tokens to `{BROADCASTER_ADDR}`.

## Register your broadcaster account

**Testnet:**
```
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx snapshot register-proxy {BROADCASTER_ADDR} --from validator --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```
echo my-secret-password | ~/.axelar/bin/axelard tx snapshot register-proxy {BROADCASTER_ADDR} --from validator --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

## Optional: check your broadcaster registration

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard q snapshot proxy $(cat ~/.axelar_testnet/validator.bech)
```
