# Launch companion processes

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Launch validator companion processes for the first time.

Axelar validators need two companion processes called `vald` and `tofnd`.

## Choose a tofnd password

Similar to your Axelar keyring, your `tofnd` storage is encrypted with a password you choose.  Your password must have at least 8 characters.

In what follows you will execute a shell script to launch the companion processes.  Your keyring and `tofnd` passwords are supplied to the shell script via `KEYRING_PASSWORD` and `TOFND_PASSWORD` environment variables.

:::caution

In the following instructions you must substitute your chosen keyring and `tofnd` passwords for `my-secret-password` and `my-tofnd-password`.

:::

## Launch companion processes

Launch `vald`, `tofnd` for the first time:

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>

```bash
KEYRING_PASSWORD=my-secret-password TOFND_PASSWORD=my-tofnd-password ./scripts/validator-tools-host.sh -n mainnet
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
KEYRING_PASSWORD=my-secret-password TOFND_PASSWORD=my-tofnd-password ./scripts/validator-tools-host.sh
```

</TabItem>
</Tabs>

:::danger

You created new secret key material.  You must backup this data.  Failure to backup this data could result in loss of funds.  See [Backup your secret data](backup) for detailed instructions.

:::

## View logs

View the streaming logs for `vald`, `tofnd`:

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>

```bash
tail -f ~/.axelar/logs/vald.log
tail -f ~/.axelar/logs/tofnd.log
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
tail -f ~/.axelar_testnet/logs/vald.log
tail -f ~/.axelar_testnet/logs/tofnd.log
```

</TabItem>
</Tabs>
