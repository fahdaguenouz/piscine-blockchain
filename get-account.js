const { ethers } = require("ethers");

async function getAccount() {
  const Provider =
    ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;

  const provider = new Provider("http://localhost:8545");

  const accounts = await provider.listAccounts();

  if (typeof accounts[0] === "string") {
    return accounts[0];
  }

  return accounts[0].address;
}

module.exports = getAccount;