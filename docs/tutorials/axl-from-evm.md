# Redeem AXL tokens from an EVM chain back to Axelar using the terminal

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- Skill level: intermediate
- Prerequisites for [Transfer AXL tokens from Axelar to an EVM chain using the terminal](/tutorials/axl-to-evm)

Transfer AXL tokens from Axelar to EVM-compatible chains using the terminal.

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Redeem AXL tokens from an EVM chain

Link your Axelar `validator` account to a new temporary deposit address on the EVM chain:

**Testnet:**
```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx evm link {EVM_CHAIN} axelarnet {VALIDATOR_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-testnet-lisbon-2 --home ~/.axelar_testnet/.core
```

**Mainnet:**
```bash
echo my-secret-password | ~/.axelar/bin/axelard tx evm link {EVM_CHAIN} axelarnet {VALIDATOR_ADDR} uaxl --from validator --gas auto --gas-adjustment 1.5 --chain-id axelar-dojo-1 --home ~/.axelar/.core
```

Output should contain

```
successfully linked {EVM_TEMP_ADDR} and {VALIDATOR_ADDR}
```

Optional: query your new `{EVM_TEMP_ADDR}`:

**Testnet:**
```bash
~/.axelar_testnet/bin/axelard q nexus latest-deposit-address {EVM_CHAIN} axelarnet {VALIDATOR_ADDR}
```

**Mainnet:**
```bash
~/.axelar/bin/axelard q nexus latest-deposit-address {EVM_CHAIN} axelarnet {VALIDATOR_ADDR}
```

Use Metamask to send some wrapped AXL tokens on `{EVM_CHAIN}` to the new temporary deposit address `{EVM_TEMP_ADDR}`.

> [!NOTE]
> Third-party monitoring tools will automatically complete the remaining steps of this process.
>
> Wait a few minutes then check your Axelar `validator` account AXL token balance as per [Basic management of your Axelar node](/setup/basic.md).

!> If you attempt the remaining steps while third-party monitoring tools are active then your commands are likely to conflict with third-party commands.  In this case you are likely to observe errors.  Deeper investigation might be needed to resolve conflicts and complete the transfer.
!>
!> The remaining steps are needed only if there are no active third-party monitoring tools and you wish to complete the process manually.

Do not proceed to the next step until you have waited for sufficiently many block confirmations on the EVM chain.  Block confirmation minimums can be found at [Testnet resources](https://docs.axelar.dev/#/resources/testnet-releases), [Mainnet resources](https://docs.axelar.dev/#/resources/mainnet-releases).

# DONE TO HERE

3. Confirm the EVM chain transaction on Axelar.
    * `[txhash]` is from the previous step
    * `[amount]` is just a number with no token denomination.  (Example: `1000000`)

    ```bash
    axelard tx evm confirm-erc20-deposit [chain] [txhash] [amount] [evm deposit address] --from validator
    ```

    Example:

    ```bash
    axelard tx evm confirm-erc20-deposit ethereum 0xb82e454a273cb32ed45a435767982293c12bf099ba419badc0a728e731f5825e 1000000 0x5CFEcE3b659e657E02e31d864ef0adE028a42a8E --from validator
    ```

    Wait for transaction to be confirmed on Axelar.
    You can search it using `docker logs -f axelar-core 2>&1 | grep -a -e "deposit confirmation"`.

4. Execute pending deposit on Axelar and verify you received the tokens.

    First, check your balance on Axelar so you can compare after the deposit:

    ```bash
    axelard q bank balances $(axelard keys show validator -a)
    ```

    Then execute pending deposit:

    ```bash
    axelard tx axelarnet execute-pending-transfers --from validator --gas auto --gas-adjustment 1.2
    ```

    Then check your balance on Axelar again and compare with previous:

    ```bash
    axelard q bank balances $(axelard keys show validator -a)
    ```

    You should see the deposited token in your balance, minus transaction fees.

Congratulations!  You have transferred assets from the external EVM chain back to Axelar!



# DONE TO HERE

That's all!

Wait a few minutes for the process to complete.  Some EVM chains might take more time than others to allow for sufficient block confirmations.

Then check your AXL balance as per [Basic management of your Axelar node](/setup/basic.md).

Congratulations!  You have transferred AXL tokens from the external EVM chain back to Axelar!
