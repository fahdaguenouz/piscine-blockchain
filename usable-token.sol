// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UsableToken {
    mapping(address => uint256) public accounts;

    // spender => approved amount
    mapping(address => uint256) public allowance;

    // spender => owner
    mapping(address => address) private approvedBy;

    uint256 public totalSupply;

    constructor(uint256 initialNumber) {
        require(initialNumber > 0, "Initial supply must be greater than 0");

        totalSupply = initialNumber;
        accounts[msg.sender] = initialNumber;
    }

    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(accounts[msg.sender] >= amount, "Insufficient balance");

        accounts[msg.sender] -= amount;
        accounts[to] += amount;
    }

    function approve(address spender, uint256 amount) public {
        require(spender != address(0), "Invalid spender");

        allowance[spender] = amount;
        approvedBy[spender] = msg.sender;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(approvedBy[msg.sender] == from, "Not approved by owner");
        require(allowance[msg.sender] >= amount, "Allowance exceeded");
        require(accounts[from] >= amount, "Insufficient balance");

        allowance[msg.sender] -= amount;
        accounts[from] -= amount;
        accounts[to] += amount;
    }
}