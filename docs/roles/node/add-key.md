# Adding a key

To add a key: 

```bash
axelard keys add <name> [flags]
```

The key is stored under the given name and encrypted with the given password. 
The password is the only required input. 

:::caution

The first time you add a key to an empty keyring, you need to enter the password twice.

:::

:::info Optional flags

The following flags are available:

* `--account <uint32>`: account number for HD derivation
* `--algo <string>`: key signing algorithm to generate keys for (default `secp256k1`)
* `--coin-type <uint32>`: coin type number for HD derivation (default 118)
* `--dry-run`: perform action, but don't add key to local keystore
* `--hd-path <string>`: manual HD Path derivation (overrides BIP44 config)
* `-h`, `--help`: help for add
* `--index <uint32>`: address index number for HD derivation
* `-i`, `--interactive`: interactively prompt user for BIP39 passphrase and mnemonic;
  will prompt you for a BIP44 path, BIP39 mnemonic, and passphrase
* `--ledger`: store a local reference to a private key on a Ledger device
* `--multisig <strings>`: list of key names stored in keyring to construct a public legacy multisig key
* `--multisig-threshold <int>`: K out of N required signatures. For use in conjunction with `--multisig` (default 1)
* `--no-backup`: do not print out seed phrase (if others are watching the terminal)
* `--nosort`: keys passed to `--multisig` are taken in the order they're supplied
* `--pubkey <string>`: parse a public key in JSON format and saves key info to `<name>` file.
* `--recover`: provide seed phrase to recover existing key instead of creating;
  can also generate or recover a key without storing it in the keystore by using the `--dry-run` flag

:::

## Keystore for Multisig Transactions

Check out the Cosmos SDK on 
[key storage for multisig transactions](https://github.com/cosmos/cosmos-sdk/blob/master/client/keys/add.go#L52) 
for more details.

:::caution Multisigs

On a shared machine, the public keys of different users can be stored in the keyring 
using `--pubkey`, but not the private keys.

:::

The public keys are used to create the multisig, as shown above.

The private keys for each user is not on the same machine, as that would be counterintuitive (in 
the case of multiple users, as there are cases where a single user may want to generate a multisig).
