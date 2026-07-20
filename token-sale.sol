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
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

contract TokenSale {
    MinimalToken public token;
    uint public tokenPrice;
    address public owner;

    constructor(address tokenAddress, uint price) {
        token = MinimalToken(tokenAddress);
        tokenPrice = price;
        owner = msg.sender;
    }

    function buy() public payable {
        uint amount = msg.value / tokenPrice;
        require(amount > 0, "Not enough Ether");
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens");

        token.transfer(msg.sender, amount);
    }

    function getPrice() public view returns (uint) {
        return tokenPrice;
    }

    function collect() public {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
}