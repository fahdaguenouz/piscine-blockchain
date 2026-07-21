const { ethers } = require("ethers");

const abi = [
  "event Transfer(address indexed sender, address indexed recipient, uint256 amount)"
];

async function transfersHistory(contractAddress, userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const events = await contract.queryFilter(contract.filters.Transfer());

  const history = [];

  for (let i = events.length - 1; i >= 0; i--) {
    const { sender, recipient, amount } = events[i].args;

    if (recipient.toLowerCase() === userAddress.toLowerCase()) {
      history.push(Number(amount));
    } else if (sender.toLowerCase() === userAddress.toLowerCase()) {
      history.push(-Number(amount));
    }
  }

  return history;
}

exports.transfersHistory = transfersHistory;