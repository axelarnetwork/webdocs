# Keyring Backend

Accounts use digital signatures to sign and authenticate transactions through keypairs. 
Keypairs need a mechanism to be stored and managed. 

## Keyring

An object known as a keyring acts as a key manager to store and manage encryption keys and 
passwords. Keyrings may take different forms of storage backends that are used to store keypairs. 
A keyring is a security feature.

**Axelar uses the `file` keyring backend by default.** 

The implementation of the keyring object comes from the third-party 
[99designs/keyring library](https://github.com/99designs/keyring), 
where the `file` backend implementation follows the 
[`file.go`](https://github.com/99designs/keyring/blob/master/file.go) file.

To specify a different backend, use the `--keyring-backend <string>`, where *string* 
is *"os", "file", "kwallet", "pass", "test"*.

For instance, to change the keyring backend to `test`: 

```bash
axelard config --keyring-backend test
```

The `file` backend stores the keyring within an application's configuration directory.

To specify the client keyring directory, use the `--keyring-dir <string>`,
where *string* is the directory. Otherwise, the default `home` directory is used.

For more information on the keyring backends, check out the Cosmos SDK documentation on 
[Setting up the keyring](https://docs.cosmos.network/v0.42/run-node/keyring.html). 

To add a key, see the [Adding a Key](add-key.md) documentation.

## Password Management

There are different ways a user can configure and enter their password.

:::caution Practice safe and diligent computing

Caution is necessary even when employing encryption.
The objective should be secure configuration with enough accessability.

:::

:::tip Protecting your keyring password

* Keep your password out of the bash history.
* While tedious, it is more secure to type your password whenever prompted.
* Use your best judgment for storing your password in an environment variable or in a configuration 
  file.
* For validators, check out this article on 
[Improving Validator Security and using HSM Module for 2FA by Chainode Tech | Chainode Tech | Medium](https://medium.com/chainode-tech/improving-validator-security-and-using-hsm-module-for-2fa-aa8b451bd84f).

:::

:::caution Using a different keyring backend

Be wary when using different keyring backends. Take the case where you have a node with keyring 
backend A, and you attempt to run axelard commands with a different keyring backend, keyring backend 
B. For instance, a validator may attempt to sign a transaction with a keypair from keyring backend B, 
where keyring backend A is the validator node's default keyring backend. The keyring backends are storage 
and management methods for keypairs. Assuming that the encrypted data within the keyring backend is the 
same, the validator may use keyring backend B as they would use keyring backend A, with the necessary 
configuration.

:::

### Configuring your password with an environment variable

To configure your keyring password, you can define an environment variable called 
`KEYRING_PASSWORD`. This password is encrypted. Your keyring password is supplied to the shell 
through this environment variable.

For password configuration, check out the [Join the Axelar network](join.md#join-the-axelar-network) 
documentation.

The `file` backend does not account for sessions. As a result, you must enter the password each 
time you access the keyring, which may occur multiple times in a single command resulting in repeated 
password prompts. The Cosmos SDK documentation provides a method for handling multiple password prompts in 
their [Keyring `file` backend](https://docs.cosmos.network/master/run-node/keyring.html#the-file-backend) 
documentation.

### Configuring your password in a file

Check out the instructions on 
[Protecting your keyring password](../validator/setup/manual.md#set-environment-variables) 
to learn how to store your keyring password as plaintext in a file on disk.
