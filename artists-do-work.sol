
pragma solidity ^0.8.4;

contract ArtistsDoWork {
    address private organizer;

    mapping(address => bool) private remuneratedArtists;
    mapping(address => bool) private hasBeenPaid;

    constructor() {
        organizer = msg.sender;
    }

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "Ticket costs 0.1 ether");
    }

    function addRemuneratedArtist(address artist) public {
        require(msg.sender == organizer, "Only organizer can add artists");

        remuneratedArtists[artist] = true;
    }

    function getPayed() public {
        require(remuneratedArtists[msg.sender], "Not a registered artist");
        require(!hasBeenPaid[msg.sender], "Artist already paid");
        require(address(this).balance >= 1 ether, "Insufficient funds");

        // Effect before external interaction: prevents repeat payment via reentrancy.
        hasBeenPaid[msg.sender] = true;

        (bool sent, ) = payable(msg.sender).call{value: 1 ether}("");
        require(sent, "Payment failed");
    }
}