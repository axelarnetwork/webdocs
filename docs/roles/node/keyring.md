# Keyring Backend

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Accounts facilitate all interactions on the Axelar network. Like other cryptographic 
networks, Axelar requires account keys for accounts to interact and transact. As Axelar 
uses the Cosmos SDK, account creation is done by the BIP32 standard, allowing you 
to create a hierarchical deterministic (HD) wallet from an initial seed phase. 

Accounts use digital signatures to sign and authenticate transactions. For instance, 
an Axelar validator will sign blocks upon validation. To do this, a validator's private 
key from the validator account's keypair is used to sign the transaction. 
The default algorithm for signing is `ecp256k1`. 

Keypairs need a mechanism to be stored and managed. 

## Keyring

An object known as a keyring acts as a key manager to store and manage encryption keys, as 
well as passwords. Keyrings may take different forms of storage backends that are used to store 
keypairs.

:::info

The following is a list of the available keyring backends:

* `os`: uses the operating system's default credentials store.
* `file`: uses encrypted file-based keystore within the application's configuration directory.
* `kwallet`: uses KDE Wallet Manager as a credentials management application.
* `pass`: uses the pass command-line utility to store and retrieve keys.
* `test`: stores keys insecurely to disk. It does not prompt for a password to be unlocked,
   and it should only be used for testing purposes.

:::

**Axelar uses the `file` keyring backend by default.** 

To specify a different backend, use the `--keyring-backend <string>`, where *string* is 
*"os", "file", "kwallet", "pass", "test"*.

For instance, to change the keyring backend to `test`: 

```bash
axelard --keyring-backend test
```

For more information on the keyring backends, check out the Cosmos SDK documentation on 
[Setting up the keyring](https://docs.cosmos.network/v0.42/run-node/keyring.html). 

For `kwallet` and `pass` backends, refer to the [`KWallet`](https://github.com/KDE/kwallet) GitHub
repository and the [`pass`](https://www.passwordstore.org/) website, respectively, as they both require 
external tooling.

> The `pass` backend requires [GnuPG](https://gnupg.org/).

## The `file` Backend

The default implementation of a keyring object comes from the third-party 
[99designs/keyring library](https://github.com/99designs/keyring), where the `file` backend implementation 
follows the [`file.go`](https://github.com/99designs/keyring/blob/master/file.go) file.

### Configuring a password

To configure your keyring password, you can define an environment variable called `KEYRING_PASSWORD`.
This password is encrypted.

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -a {CORE_VERSION} -n mainnet
```

</TabItem>

<TabItem value="testnet" label="Testnet">

```bash
KEYRING_PASSWORD=my-secret-password ./scripts/node.sh -a {CORE_VERSION} -n testnet
```

</TabItem>
</Tabs>

where *{CORE_VERSION}* is the release you are running on, such as *v0.10.6*.

The `file` backend does not account for sessions. As a result, you must enter the password each time
you access the keyring, which may occur multiple times in a single command resulting in repeated password 
prompts.

:::tip

A way around this is to use a bash script to set the `KEYRING_PASSWORD` and account for multiple 
prompts, as shown below.

```bash
axelard config keyring-backend file                                                        # use file backend
(echo $KEYRING_PASSWORD; echo $KEYRING_PASSWORD) | axelard keys add <name> [flags]         # multiple prompts
echo $KEYRING_PASSWORD | axelard keys show [name_or_address [name_or_address...]] [flags]  # single prompt
```

:::

:::caution Protecting your keyring password

It is best practice to store your keyring password securely. 
A possible method is to store it as a plaintext password in a file on disk. 

:::

Add `{KEYRING_PASSWORD}` to `$HOME/.profile`:

```
echo export KEYRING_PASSWORD=PUT_YOUR_KEYRING_PASSWORD_HERE >> $HOME/.profile
```

Apply your changes:

```bash
source $HOME/.profile
```

### Adding a key

To add a key: 

```bash
axelard keys add <name> [flags]
```

The key is stored under the given name and encrypted with the given password. The password is the 
only required input. 

:::caution

The first time you add a key to an empty keyring, you need to enter the password twice.

:::

:::info

The following optional flags are available:

* `--account <uint32>`: account number for HD derivation
* `--algo <string>`: key signing algorithm to generate keys for (default `secp256k1`)
* `--coin-type <uint32>`: coin type number for HD derivation (default 118)
* `--dry-run`: perform action, but don't add key to local keystore
* `--hd-path <string>`: manual HD Path derivation (overrides BIP44 config)
* `-h`, `--help`: help for add
* `--index <uint32>`: address index number for HD derivation
* `-i`, `--interactive`: interactively prompt user for BIP39 passphrase and mnemonic
* `--ledger`: store a local reference to a private key on a Ledger device
* `--multisig <strings>`: list of key names stored in keyring to construct a public legacy multisig key
* `--multisig-threshold <int>`: K out of N required signatures. For use in conjunction with `--multisig` (default 1)
* `--no-backup`: do not print out seed phrase (if others are watching the terminal)
* `--nosort`: keys passed to `--multisig` are taken in the order they're supplied
* `--pubkey <string>`: parse a public key in JSON format and saves key info to `<name>` file.
* `--recover`: provide seed phrase to recover existing key instead of creating

:::

Adding keys with the `-i` flag will prompt you for a BIP44 path, BIP39 mnemonic, and passphrase.
If you have an existing key, using the `--recover` allows you to recover a key from a seed passphrase.
You can also generate or recover a key without storing it in the keystore by using the `--dry-run` flag.

### Keystore for multisig transactions

Using the `--pubkey` flag allows you to add arbitrary public keys to the keystore for constructing
multisig transactions. You can create and store a multisig key by passing the list of key names stored in a 
keyring and the minimum number of signatures required through `--multisig-threshold`.

> The keys are sorted by address unless the flag `--nosort` is set.

```bash
keys add mymultisig --multisig "keyname1,keyname2,keyname3" --multisig-threshold 3
```

### Things to Consider

:::caution Using a different keyring backend

Take the case where you have a node with keyring backend A, and you attempt to run axelard commands 
with a different keyring backend, keyring backend B. 

:::

For instance, a validator may attempt to sign a transaction with a keypair from keyring backend B, 
where keyring backend A is the validator node's default keyring backend. The keyring backends are 
storage and management methods for keypairs. Assuming that the encrypted data within the 
keyring backend is the same, the validator may use keyring backend B as they would use keyring backend 
A, with the necessary configuration.

:::caution Multisigs

On a shared machine, the public keys of different users can be stored in the keyring 
using `--pubkey`, but not the private keys.

:::

The public keys are used to create the multisig, as shown in the [keystore for 
multisig transactions](#keystore-for-multisig-transactions) section.

The private keys for each user is not on the same machine, as that would be counterintuitive (in 
the case of multiple users, as there are cases where a single user may want to generate a multisig).
