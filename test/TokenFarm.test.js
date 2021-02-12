const Token = artifacts.require('Token')
const DappToken = artifacts.require('DappToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let token, dappToken, tokenFarm

  before(async () => {
    // Load Contracts
    token = await Token.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, token.address)

    // Transfer all Dapp tokens to farm (1 million)
    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    // Send tokens to investor
    await token.transfer(investor, tokens('100'), { from: owner })
  })

  describe('Mock Token eth deployment', async () => {
    it('has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Mock ETH Token')
    })
  })

  describe('Dapp Token deployment', async () => {
    it('has a name', async () => {
      const name = await dappToken.name()
      assert.equal(name, 'DApp Token')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Dapp Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming tokens', async () => {

    it('rewards investors for staking eth tokens', async () => {
      let result

      // Check investor balance before staking
      result = await token.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock eth wallet balance correct before staking')

      // Stake Mock eth Tokens
      await token.approve(tokenFarm.address, tokens('100'), { from: investor })
      await tokenFarm.stakeTokens(tokens('100'), { from: investor })

      // Check staking result
      result = await token.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Mock eth wallet balance correct after staking')

      result = await token.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('100'), 'Token Farm Mock eth balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      // Issue Tokens
      await tokenFarm.issueTokens({ from: owner })

      // Check balances after issuance
      result = await dappToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct affter issuance')

      // Ensure that only onwer can issue tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

      // Check counters
      const counter = await tokenFarm.withDrawRequirement()
      assert.equal(counter.toString(), '1', 'check if the counter is working')

      // Unstake tokens
      await tokenFarm.unstakeTokens(11, { from: investor })

      // Check results after unstaking
      result = await token.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock eth wallet balance correct after staking')

      result = await token.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('0'), 'Token Farm Mock eth balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
  })

})
