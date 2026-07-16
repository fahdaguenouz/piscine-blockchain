const { ethers } = require("ethers");

async function getAccount() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const accounts = await provider.listAccounts();

  return accounts[0];
}

module.exports = getAccount;