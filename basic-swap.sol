// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UsableToken {
    mapping(address => uint256) public accounts;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 initialSupply) {
        accounts[msg.sender] = initialSupply;
    }

    function transfer(address to, uint256 amount) public {
        require(accounts[msg.sender] >= amount, "Insufficient balance");

        accounts[msg.sender] -= amount;
        accounts[to] += amount;
    }

    function approve(address spender, uint256 amount) public {
        allowance[msg.sender][spender] = amount;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public {
        require(accounts[from] >= amount, "Insufficient balance");
        require(
            allowance[from][msg.sender] >= amount,
            "Allowance exceeded"
        );

        allowance[from][msg.sender] -= amount;
        accounts[from] -= amount;
        accounts[to] += amount;
    }
}

contract BasicSwap {
    address public user1;
    address public user2;

    constructor(address _user1, address _user2) {
        user1 = _user1;
        user2 = _user2;
    }

    function swap(
        address tokenA,
        uint256 amountA,
        address tokenB,
        uint256 amountB
    ) public {
        UsableToken tA = UsableToken(tokenA);
        UsableToken tB = UsableToken(tokenB);

        require(tA.accounts(user1) >= amountA, "User1 balance");
        require(tB.accounts(user2) >= amountB, "User2 balance");

        require(
            tA.allowance(user1, address(this)) >= amountA,
            "User1 allowance"
        );
        require(
            tB.allowance(user2, address(this)) >= amountB,
            "User2 allowance"
        );

        tA.transferFrom(user1, user2, amountA);
        tB.transferFrom(user2, user1, amountB);
    }
}