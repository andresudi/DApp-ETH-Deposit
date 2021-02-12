import React, { Component } from 'react'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load Token
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      if (tokenBalance)       this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      if (dappTokenBalance) this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    } else {
      window.alert('DappToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      console.log({stakingBalance})
      if (stakingBalance) this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (counter) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens(11).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      token: {},
      dappToken: {},
      tokenFarm: {},
      tokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    console.log(this.state.stakingBalance)
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        tokenBalance={this.state.tokenBalance}
        dappTokenBalance={this.state.dappTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
