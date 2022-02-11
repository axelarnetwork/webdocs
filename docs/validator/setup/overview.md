# Overview
-----------
An Axelar network validator participates in block creation, multi-party cryptography protocols, and voting.

Convert your existing Axelar node into a validator by staking AXL tokens and attaching external EVM-compatible blockchains.

!> The Axelar network is under active development.  Use at your own risk with funds you're comfortable using.  See [Terms of use](/terms-of-use).

## Prerequisites

- **Hardware:** Minimum: 16 cores, 16GB RAM, 1.5 TB drive. Recommended: 32 cores, 32 GB RAM, 2 TB+ drive.
- Downloaded the Axelar blockchain and be comfortable with basic node management as per [Setup instructions](/parent-pages/setup.md).
- Your Axelar node has an account named `validator` that you control.  Let `{VALIDATOR_ADDR}` denote the address of your `validator` account.
- Backup your `validator` secret mnemonic and your Tendermint consensus secret key as per [Join the Axelar network for the first time](/setup/join.md)

## Steps to become a validator

1. [Launch companion processes for the first time](/validator/setup/vald-tofnd.md)
2. [Back-up your validator mnemonics and secret keys](/validator/setup/backup.md)
3. [Register broadcaster proxy](/validator/setup/register-proxy.md)
4. [Stake AXL tokens on the Axelar network](/validator/setup/stake-axl-tokens.md)
5. [Health check](/validator/setup/health-check.md)
6. [Set up external chains](/validator/external-chains/overview.md)

## Other setup-related tasks

* [Troubleshoot start-up](/validator/troubleshoot/troubleshoot.md)
* [Recover validator from mnemonic or secret keys](/validator/troubleshoot/recovery.md)
* [Leave as a validator](/validator/troubleshoot/leave.md)
* [Missed too many blocks](/validator/troubleshoot/missed-too-many-blocks.md)
