pragma solidity ^0.8.4;

contract OrganizedFestival {
    address private organizer;
    uint private startTime;
    string private place;

    constructor(uint date, string memory festivalPlace) {
        organizer = msg.sender;
        startTime = date;
        place = festivalPlace;
    }

    function getStartTime() public view returns (uint) {
        return startTime;
    }

    function getPlace() public view returns (string memory) {
        return place;
    }

    function updateStartTime(uint newTime) public {
        require(msg.sender == organizer, "Only organizer can update");
        startTime = newTime;
    }

    function updatePlace(string memory newPlace) public {
        require(msg.sender == organizer, "Only organizer can update");
        place = newPlace;
    }
}