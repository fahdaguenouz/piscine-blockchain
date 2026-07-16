pragma solidity ^0.8.4;

contract FunAndProfit {
    address payable private organizer;
    mapping(address => uint) private tickets;

    constructor() {
        organizer = payable(msg.sender);
    }

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "Ticket costs 0.1 ether");

        tickets[msg.sender] += 1;
    }

    function ticketsOf(address user) public view returns (uint) {
        return tickets[user];
    }

    function redeemTicket() public {
        require(tickets[msg.sender] > 0, "No ticket to redeem");

        tickets[msg.sender] -= 1;
    }

    function getBenefits() public {
        require(msg.sender == organizer, "Only organizer can withdraw");

        uint amount = address(this).balance;

        (bool sent, ) = organizer.call{value: amount}("");
        require(sent, "Transfer failed");
    }
}