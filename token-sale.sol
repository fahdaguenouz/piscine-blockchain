// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMinimalToken {
    function balanceOf(address account) external view returns (uint);
    function transfer(address to, uint amount) external;
}

contract TokenSale {
    IMinimalToken public token;
    uint public tokenPrice;
    address public owner;

    constructor(address tokenAddress, uint price) {
        require(price > 0, "Price must be greater than 0");

        token = IMinimalToken(tokenAddress);
        tokenPrice = price;
        owner = msg.sender;
    }

    function buy() public payable {
        require(msg.value > 0, "Send some Ether");

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