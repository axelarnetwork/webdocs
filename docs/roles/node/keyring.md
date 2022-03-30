# Keyring Backend

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Accounts facilitate all interactions on the Axelar network. Like other cryptographic 
networks, Axelar requires account keys for accounts to interact and transact. Accounts use 
digital signatures to sign and authenticate transactions through keypairs. Keypairs need a
mechanism to be stored and managed. 

## Keyring

An object known as a keyring acts as a key manager to store and manage encryption keys, as 
well as passwords. Keyrings may take different forms of storage backends that are used to 
store keypairs.

**Axelar uses the `file` keyring backend by default.** 

The implementation of the the keyring object comes from the third-party 
[99designs/keyring library](https://github.com/99designs/keyring), 
where the `file` backend implementation follows the 
[`file.go`](https://github.com/99designs/keyring/blob/master/file.go) file.

To specify a different backend, use the `--keyring-backend <string>`, where *string* 
is *"os", "file", "kwallet", "pass", "test"*.

For instance, to change the keyring backend to `test`: 

```bash
axelard config --keyring-backend test
```

For more information on the keyring backends, check out the Cosmos SDK documentation on 
[Setting up the keyring](https://docs.cosmos.network/v0.42/run-node/keyring.html). 

## Password Management

There are different ways a user can configure and store their password.

:::caution Practice safe and diligent computing

Caution must still be taken even when employing encryption.
The objective should always be safe and secure configuration.

:::

:::tip Protecting your keyring password

* Keep your password out of the bash history.
* Use a file to store your password only if necessary.
* Environment variables are generally more secure than plaintext files.

:::

### Configuring a password

To configure your keyring password, you can define an environment variable called 
`KEYRING_PASSWORD`. This password is encrypted.

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

The `file` backend does not account for sessions. As a result, you must enter the password each 
time you access the keyring, which may occur multiple times in a single command resulting in repeated 
password prompts.

:::tip

A way around this is to use a bash script to set the `KEYRING_PASSWORD` and account for multiple 
prompts, as shown below.

```bash
axelard config keyring-backend file                                                        # use file backend
(echo $KEYRING_PASSWORD; echo $KEYRING_PASSWORD) | axelard keys add <name> [flags]         # multiple prompts
echo $KEYRING_PASSWORD | axelard keys show [name_or_address [name_or_address...]] [flags]  # single prompt
```

:::

Add `{KEYRING_PASSWORD}` to `$HOME/.profile`:

```
echo export KEYRING_PASSWORD=PUT_YOUR_KEYRING_PASSWORD_HERE >> $HOME/.profile
```

Apply your changes:

```bash
source $HOME/.profile
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
