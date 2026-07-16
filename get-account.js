const { ethers } = require("ethers");

async function getAccount() {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");

  const accounts = await provider.listAccounts();

  return accounts[0].address;
}

module.exports = getAccount;