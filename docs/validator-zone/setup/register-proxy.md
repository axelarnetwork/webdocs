# Register broadcaster proxy
-----------

# TODO Notes


```
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx snapshot register-proxy axelar108qdrl6p83a7mggfm2wm4rjclsr2xuzf8kkqzr --from validator --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

```
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx staking create-validator --amount 1000000uaxl --moniker "eris" --commission-rate="0.10" --commission-max-rate="0.20" --commission-max-change-rate="0.01" --min-self-delegation="1" --pubkey="$(~/.axelar_testnet/bin/axelard tendermint show-validator --home ~/.axelar_testnet/.core)" --from validator --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

```
axelard health-check --tofnd-host tofnd --operator-addr $(cat /root/shared/validator.bech) --node http://axelar-core:26657
```

```
echo my-secret-password | ~/.axelar_testnet/bin/axelard health-check --tofnd-host localhost --operator-addr axelarvaloper1vq8p2he73z28uwseeqnapxdasnsr8t793j3jrl --home ~/.axelar_testnet/.vald
```
# OLD

Axelar validators exchange messages with one another via the Axelar blockchain.  Each validator sends these messages from a separate `broadcaster` account.


!> :fire: A validator can only register one broadcaster throughout its lifetime.  This broadcaster address cannot be changed after it has been registered.  If you need to register a different proxy address then you must also create an entirely new validator.


>If you forgot to copy the `broadcaster` address from the terminal output then you can display it from the `vald` container, not `axelar-core`.
>```bash
>docker exec -it vald sh
>axelard keys show broadcaster -a
>```
>If using the binary, then pass in the appropriate `vald` folder.
>```bash
>$HOME/.axelar_testnet/bin/axelard keys show broadcaster -a --home $HOME/.axelar_testnet/.vald
>```
>
Go to [Axelar faucet](http://faucet.testnet.axelar.dev/) and get some coins on your `broadcaster` address.

In the `axelar-core` container: use the proxy address from above to register the broadcaster account as a proxy for your validator.

```bash
axelard tx snapshot register-proxy [proxy address] [flags]
```

For example:

```bash
axelard tx snapshot register-proxy axelar1xg93jnefgz3gsnuyqrmq2q288z8st3cf43jecs --from validator
```

Output should be something like:
```json5
{"height":"1461","txhash":"3C38BD2F7020E42AE1F5A26DEC8FD2656B1B246AB9813CDC64CC09919C17FD8E","codespace":"","code":0,"data":"0A280A262F736E617073686F742E763162657461312E526567697374657250726F787952657175657374","raw_log":"[{\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"RegisterProxy\"},{\"key\":\"module\",\"value\":\"snapshot\"},{\"key\":\"action\",\"value\":\"registerProxy\"},{\"key\":\"sender\",\"value\":\"axelarvaloper1ylmsql3xc7t3qvgqjq44ntragzqn07p70j06j5\"},{\"key\":\"address\",\"value\":\"axelar1jkh7c338v0ktnuucc26r8kxt70dz20p7q0rh94\"}]}]}]","logs":[{"msg_index":0,"log":"","events":[{"type":"message","attributes":[{"key":"action","value":"RegisterProxy"},{"key":"module","value":"snapshot"},{"key":"action","value":"registerProxy"},{"key":"sender","value":"axelarvaloper1ylmsql3xc7t3qvgqjq44ntragzqn07p70j06j5"},{"key":"address","value":"axelar1jkh7c338v0ktnuucc26r8kxt70dz20p7q0rh94"}]}]}],"info":"","gas_wanted":"200000","gas_used":"65425","tx":null,"timestamp":""}
```

### Optional: check your registration

Check your address for proxy registered:
```bash
axelard q snapshot proxy $(axelard keys show validator -a --bech val)

{"address":"axelar1jkh7c338v0ktnuucc26r8kxt70dz20p7q0rh94","status":"active"}
```