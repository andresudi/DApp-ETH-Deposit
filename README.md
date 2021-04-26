# DApp-ETH-Deposit

### DEPENDENCIES

* Node version 12.18.0
* npm install -g ganache-cli
* npm install --g truffle@5.1.39
* Metamask chrome extension

### Step to compile in terminal

```
1. npm install
2. ganache-cli 
3. truffle compile
4. truffle migrate / truffle migrate --reset
```

### Step to console

```
1. truffle console
2. tokenFarm = await TokenFarm.deployed()
3. eth = await Token.deployed()
4. accounts = await web3.eth.getAccounts.accounts[1]
5. balance = await eth.balanceOf(accounts[1])
6. balance.toString()
```

### Contract's unit tests

```
truffle test 
```

### Step to run DApp

```
1. npm run start
2. connect to metamask and ensure using Localhost 8545 Network
3. import testing account from ganache into Metamask
```

![Dapp](https://github.com/andresudi/DApp-ETH-Deposit/blob/master/Dapp.png)
