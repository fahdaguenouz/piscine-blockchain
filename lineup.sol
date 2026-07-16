pragma solidity ^0.8.4;

contract Lineup {
    string[] private artists;

    function addArtist(string memory artistName) public {
        artists.push(artistName);
    }

    function lineup(uint index) public view returns (string memory) {
        return artists[index];
    }
}