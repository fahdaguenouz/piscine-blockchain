// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventfulToken {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    address public owner;

    event Transfer(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );

    event Minting(
        address indexed recipient,
        uint256 amount
    );

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        totalSupply = initialSupply;
        balances[msg.sender] = initialSupply;

        // Emit mint event for the initial supply
        emit Minting(msg.sender, initialSupply);
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner");

        balances[to] += amount;
        totalSupply += amount;

        emit Minting(to, amount);
    }
}