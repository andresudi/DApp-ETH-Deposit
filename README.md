# DApp-ETH-Deposit

### DEPENDENCIES

* Node version 12.18.0
* npm install -g ganache-cli
* npm install --g truffle@5.1.39
* Metamask chrome extension

### Step To Compile In Terminal

* npm install
* truffle compile
* truffle migrate / truffle migrate --reset
* truffle console
* tokenFarm = await TokenFarm.deployed()
* eth = await Token.deployed()
* accounts = await web3.eth.getAccounts.accounts[1]
* balance = await eth.balanceOf(accounts[1])
* balance.toString()

### Contract's unit tests

* truffle test 

### Step to run DApp

* npm run start
