pragma solidity ^0.8.4;

contract TimeAndPlace {
    uint private startTime;
    string private place;

    constructor(uint _startTime, string memory _place) {
        startTime = _startTime;
        place = _place;
    }

    function getStartTime() public view returns (uint) {
        return startTime;
    }

    function getPlace() public view returns (string memory) {
        return place;
    }
}