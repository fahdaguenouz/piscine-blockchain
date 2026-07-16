pragma solidity ^0.8.4;

contract NamedFestival {
    string private festivalName;

    function setName(string memory input) public {
        festivalName = input;
    }

    function getName() public view returns (string memory) {
        return festivalName;
    }
}