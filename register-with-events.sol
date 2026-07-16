
pragma solidity ^0.8.0;

contract RegisterWithEvents {
    mapping(bytes32 => uint) private documentTimestamps;

    event DocumentAdded(bytes32 documentHash, uint timestamp);

    function addDocument(bytes32 documentHash) public {
        documentTimestamps[documentHash] = block.timestamp;
        emit DocumentAdded(documentHash, block.timestamp);
    }

    function getDate(bytes32 documentHash) public view returns (uint) {
        return documentTimestamps[documentHash];
    }
}