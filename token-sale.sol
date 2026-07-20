// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./minimal-token.sol";

contract TokenSale {
    MinimalToken public token;
    uint public tokenPrice;
    address public owner;

    constructor(address tokenAddress, uint price) {
        require(price > 0, "Price must be greater than 0");

        token = MinimalToken(tokenAddress);
        tokenPrice = price;
        owner = msg.sender;
    }

    function buy() public payable {
        require(msg.value > 0, "Send some Ether");

        uint amount = msg.value / tokenPrice;
        require(amount > 0, "Not enough Ether");

        require(
            token.balanceOf(address(this)) >= amount,
            "Not enough tokens available"
        );

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