# DApp-ETH-Deposit

### DEPENDENCIES

* Node version 12.18.0
* npm install -g ganache-cli
* npm install --g truffle@5.1.39
* Metamask chrome extension

### Step To Compile In Terminal

1. npm install
2. truffle compile
3. truffle migrate / truffle migrate --reset

### Step To Console

1. truffle console
2. tokenFarm = await TokenFarm.deployed()
3. eth = await Token.deployed()
4. accounts = await web3.eth.getAccounts.accounts[1]
5 balance = await eth.balanceOf(accounts[1])
6. balance.toString()

### Contract's unit tests

* truffle test 

### Step to run DApp

* npm run start
![Dapp](https://github.com/andresudi/DApp-ETH-Deposit/blob/master/Dapp.png)
