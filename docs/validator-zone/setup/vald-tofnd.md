# Launch companion processes for the first time
-----------

Axelar validators need two companion processes called `vald` and `tofnd`.

## Choose a tofnd password

Similar to your Axelar keyring, your `tofnd` storage is encrypted with a password you choose.  Your password must have at least 8 characters.

In what follows you will execute a shell script to launch the companion processes.  Your keyring and `tofnd` passwords are supplied to the shell script via `KEYRING_PASSWORD` and `TOFND_PASSWORD` environment variables.

!> In the following instructions you must substitute your chosen keyring and `tofnd` passwords for:
> * `my-secret-password`
> * `my-tofnd-password`

## Launch companion processes

Launch `vald`, `tofnd` for the first time:

**Testnet:**
```bash
KEYRING_PASSWORD=my-secret-password TOFND_PASSWORD=my-tofnd-password ./scripts/validator-tools-host.sh
```

**Mainnet:**
```bash
KEYRING_PASSWORD=my-secret-password TOFND_PASSWORD=my-tofnd-password ./scripts/validator-tools-host.sh -n mainnet
```

Save a copy of your `broadcaster` mnemonic in a safe place.  See [Backup](/validator-zone/setup/backup) for detailed instructions.