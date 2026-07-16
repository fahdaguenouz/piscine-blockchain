pragma solidity ^0.8.4;

contract BuyTickets {
    mapping(address => uint) private tickets;

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "Ticket costs 0.1 ether");

        tickets[msg.sender] += 1;
    }

    function ticketsOf(address user) public view returns (uint) {
        return tickets[user];
    }
}