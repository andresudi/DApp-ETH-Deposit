pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./Token.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    DappToken public dappToken;
    Token public token;
    uint256 public counter;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, Token _token) public {
        dappToken = _dappToken;
        token = _token;
        owner = msg.sender;
        counter = 0;
    }

    // Deposit
    function stakeTokens(uint256 _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer tokens to this contract for staking
        token.transferFrom(msg.sender, address(this), _amount);

        // Update balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

        // Each time deposit function call will increment counter
        counter = counter + 1;
    }

    function withDrawRequirement() public view returns (uint256) {
        return counter;
    }

    // Withdraw
    function unstakeTokens(uint256 _counter) public {
        // Fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Requeire counter greater that 10
        require(_counter > 10, "counter must be more than 10");

        // Transfer tokens to this contract for staking
        token.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
