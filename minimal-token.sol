// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MinimalToken {
    uint public totalSupply;

    mapping(address => uint) public balances;

    constructor(uint initialSupply) {
        require(initialSupply > 0, "Initial supply must be greater than 0");

        totalSupply = initialSupply;
        balances[msg.sender] = initialSupply;
    }

    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) public {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}