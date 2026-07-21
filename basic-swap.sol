// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUsableToken {
    function accounts(address account) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external;
}

contract BasicSwap {
    address public user1;
    address public user2;

    constructor(address _user1, address _user2) {
        require(_user1 != address(0), "Invalid user1");
        require(_user2 != address(0), "Invalid user2");

        user1 = _user1;
        user2 = _user2;
    }

    function swap(
        address tokenA,
        uint256 amountA,
        address tokenB,
        uint256 amountB
    ) public {
        IUsableToken tA = IUsableToken(tokenA);
        IUsableToken tB = IUsableToken(tokenB);

        // Check balances
        require(tA.accounts(user1) >= amountA, "User1 insufficient balance");
        require(tB.accounts(user2) >= amountB, "User2 insufficient balance");

        // Check allowances
        require(
            tA.allowance(user1, address(this)) >= amountA,
            "User1 allowance too low"
        );
        require(
            tB.allowance(user2, address(this)) >= amountB,
            "User2 allowance too low"
        );

        // Atomic swap
        tA.transferFrom(user1, user2, amountA);
        tB.transferFrom(user2, user1, amountB);
    }
}