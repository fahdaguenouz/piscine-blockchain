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
        require(initialSupply > 0, "Initial supply must be greater than 0");

        owner = msg.sender;
        totalSupply = initialSupply;
        balances[msg.sender] = initialSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner");
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");

        balances[to] += amount;
        totalSupply += amount;

        emit Minting(to, amount);
    }
}