# Testnet Validator Instructions

## install jq
```bash
sudo apt install jq
```
## Get Binaries
```bash
# create a directory where we will store our binaries temporarily
mkdir binaries && cd binaries
# get axelar-core binary
wget https://github.com/axelarnetwork/axelar-core/releases/download/v0.13.6/axelard-linux-amd64-v0.13.6
# get tofnd binary
wget https://github.com/axelarnetwork/tofnd/releases/download/v0.9.1/tofnd-linux-amd64-v0.9.1

# rename it
mv axelard-linux-amd64-v0.13.6 axelard
mv tofnd-linux-amd64-v0.9.1 tofnd
# change permissions
chmod +x *
# move to usr bin
sudo mv * /usr/bin/
# check versions
axelard version
tofnd --help
```
## create keys
```bash
axelard keys add broadcaster
axelard keys add validator
tofnd -m create
# save and delete
cat .tofnd/export
rm .tofnd/export
```
## Set variables
```bash
echo export MONIKER=PUT_YOUR_MONIKER_HERE >> $HOME/.profile 
echo export CHAIN_ID=axelar-testnet-lisbon-3 >> $HOME/.profile 
VALIDATOR_OPERATOR_ADDRESS=`axelard keys show validator --bech val --output json | jq -r .address`
BROADCASTER_ADDRESS=`axelard keys show broadcaster --output json | jq -r .address`
echo export VALIDATOR_OPERATOR_ADDRESS=$VALIDATOR_OPERATOR_ADDRESS >> $HOME/.profile 
echo export BROADCASTER_ADDRESS=BROADCASTER_ADDRESS >> $HOME/.profile 
# for keyring password it's better to edit the file and add it manually, so prevent getting it saved in bash history :)
echo export KEYRING_PASSWORD=PUT_YOUR_KEYRING_PASSWORD_HERE >> $HOME/.profile 
source $HOME/.profile
```

## configuration setup
```bash
# have to make two tabs here, one for mainnet and one testnet
axelard init $MONIKER --chain-id $CHAIN_ID
# download modified config used in axelar - suggest team to do it in `init`
wget https://raw.githubusercontent.com/axelarnetwork/axelarate-community/main/configuration/config.toml -O $HOME/.axelar/config/config.toml
wget https://raw.githubusercontent.com/axelarnetwork/axelarate-community/main/configuration/app.toml -O $HOME/.axelar/config/app.toml

# download genesis file
wget https://axelar-testnet.s3.us-east-2.amazonaws.com/genesis.json -O $HOME/.axelar/config/genesis.json
# download latest seeds
wget https://axelar-testnet.s3.us-east-2.amazonaws.com/seeds.txt -O $HOME/.axelar/config/seeds.txt
# enter seeds to your config.json file
sed -i.bak 's/seeds = \"\"/seeds = \"'$(cat $HOME/.axelar/config/seeds.txt)'\"/g' $HOME/.axelar/config/config.toml
# set external ip to your config.json file
sed -i.bak 's/external_address = \"\"/external_address = \"'"$(curl -4 ifconfig.co)"':26656\"/g' $HOME/.axelar/config/config.toml
```


## Sync From Snapshot
```bash
# have to make two tabs here, one for mainnet and one testnet
axelard unsafe-reset-all
sudo apt-get update -y
sudo apt-get install wget liblz4-tool aria2 -y
URL=`curl https://quicksync.io/axelar.json|jq -r '.[] |select(.file=="axelartestnet-lisbon-3-pruned")|.url'`
echo $URL
cd $HOME/.axelar/
wget -O - $URL | lz4 -d | tar -xvf -
cd $HOME
```

## Create services

### Axelar
```bash
# axelard service
sudo tee <<EOF >/dev/null /etc/systemd/system/axelard.service
[Unit]
Description=Axelard Cosmos daemon
After=network-online.target

[Service]
User=$USER
ExecStart=/usr/bin/axelard start
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF


cat /etc/systemd/system/axelard.service
sudo systemctl enable axelard
```
### tofnd service
```bash
sudo tee <<EOF >/dev/null /etc/systemd/system/tofnd.service
[Unit]
Description=Tofnd daemon
After=network-online.target

[Service]
User=$USER
ExecStart=/usr/bin/sh -c 'echo $KEYRING_PASSWORD | tofnd -m existing -d $HOME/.tofnd'
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

cat /etc/systemd/system/tofnd.service
sudo systemctl enable tofnd
```

### Vald service

```bash
# check if we need chain-id in vald service
sudo tee <<EOF >/dev/null /etc/systemd/system/vald.service
[Unit]
Description=Vald daemon
After=network-online.target
[Service]
User=$USER
ExecStart=/usr/bin/sh -c 'echo $KEYRING_PASSWORD | /usr/bin/axelard vald-start --validator-addr $VALIDATOR_OPERATOR_ADDRESS --log_level debug --chain-id $CHAIN_ID'
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

cat /etc/systemd/system/vald.service
sudo systemctl enable vald
```

## Start all services
```bash
# first start axelard and make sure its all caught up with the latest block height
# then start tofnd as vald listens on tofnd port
# at last start vald

sudo systemctl daemon-reload
sudo systemctl restart axelard
sudo systemctl restart tofnd
sudo systemctl restart vald
```
## Check logs
```bash
# change log settings to persistent
sed -i 's/#Storage=auto/Storage=persistent/g' /etc/systemd/journald.conf
sudo systemctl restart systemd-journald

journalctl -u axelard.service -f -n 100
journalctl -u tofnd.service -f -n 100
journalctl -u vald.service -f -n 100
```

## Register proxy
```bash
# make sure you fund your validator and broadcaster address before moving ahead
# first register the broadcaster address with your validator account
axelard tx snapshot register-proxy $BROADCASTER_ADDRESS --from validator --chain-id $CHAIN_ID
```

## Create validator
```bash
# set temporary variables for create-validator command
IDENTITY="YOUR_KEYBASE_IDENTITY"
AMOUNT=PUT_AMOUNT_OF_TOKEN_YOU_WANT_TO_DELEGATE
DENOM=uaxl

axelard tx staking create-validator --yes \
 --amount $AMOUNT$DENOM \
 --moniker $MONIKER \
 --commission-rate="0.10" \
 --commission-max-rate="0.20" \
 --commission-max-change-rate="0.01" \
 --min-self-delegation="1" \
 --pubkey="$(axelard tendermint show-validator)" \
 --from validator \
 -b block \
 --identity=$IDENTITY \
 --chain-id $CHAIN_ID
```

## register external chains
```bash
axelard tx nexus register-chain-maintainer ethereum --from broadcaster --chain-id $CHAIN_ID 
```
