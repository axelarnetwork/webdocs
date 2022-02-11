# Back-up your validator mnemonics and secret keys

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

You must store backup copies of the following data in a safe place:

1. `validator` account secret mnemonic
2. Tendermint validator secret key
3. `broadcaster` account secret mnemonic
4. `tofnd` secret mnemonic

Items 1 and 2 were created when you completed [Join the Axelar network for the first time](/setup/join.md).

Items 3 and 4 were created when you completed [Launch validator companion processes for the first time](/validator/setup/vald-tofnd.md).

## Validator account secret mnemonic

BACKUP and DELETE the `validator` account secret mnemonic:

**Testnet:**
```
~/.axelar_testnet/validator.txt
```

**Mainnet:**
```
~/.axelar/validator.txt
```

## Tendermint validator secret key

BACKUP but do NOT DELETE the Tendermint consensus secret key (this is needed on node restarts):

**Testnet:**
```
~/.axelar_testnet/.core/config/priv_validator_key.json
```

**Mainnet:**
```
~/.axelar/.core/config/priv_validator_key.json
```

## Broadcaster account secret mnemonic

BACKUP and DELETE the `broadcaster` account secret mnemonic:

**Testnet:**
```
~/.axelar_testnet/broadcaster.txt
```

**Mainnet:**
```
~/.axelar/broadcaster.txt
```

## Tofnd secret mnemonic

BACKUP and DELETE the `tofnd` secret mnemonic:

**Testnet:**
```
~/.axelar_testnet/.tofnd/import
```

**Mainnet:**
```
~/.axelar/.tofnd/import
```
