import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Deposit Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} ETH</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                console.log({amount})
                if (amount < '100000000000000000') {
                  window.alert('Minimum deposit 0.1 ETH')
                } else {
                  this.props.stakeTokens(amount)
                }
              }}>
              <div>
                <label className="float-left"><b>Deposit Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; ETH
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Deposit</button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                Withdraw
              </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
