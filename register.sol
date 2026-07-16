pragma solidity ^0.8.0;

contract Register {
    mapping(bytes32 => uint) private documentTimestamps;

    function addDocument(bytes32 documentHash) public {
        documentTimestamps[documentHash] = block.timestamp;
    }

    function getDate(bytes32 documentHash) public view returns (uint) {
        return documentTimestamps[documentHash];
    }
}