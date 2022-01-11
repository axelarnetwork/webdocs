# Too many open files

## Problem 
You see a panic message containing `too many open files`.  Most often seen immediately on startup, but it could happen any time.

## Cause

Some systems (especially MacOS) have a very low limit on the number of open files they allow.  The Cosmos SDK opens a lot of files at once.  (See for example this [github issue](https://github.com/cosmos/cosmos-sdk/issues/1394.))

## Solution

Increase the maximum number of open files on your system `ulimit -n 16384`.  You may wish to add this command to your shell profile so that you do not need to execute it next time you restart.

## Further reading

More details, including other ways to increase the maximum number of open files:
* [gaiad: opens many files while synching and can exceed standard Linux limits · Issue #1394 · cosmos/cosmos-sdk](https://github.com/cosmos/cosmos-sdk/issues/1394)
* [Maximum limits (in macOS file descriptors) – Index](https://wilsonmar.github.io/maximum-limits/)
* [How to Increase Number of Open Files Limit in Linux](https://www.tecmint.com/increase-set-open-file-limits-in-linux/)