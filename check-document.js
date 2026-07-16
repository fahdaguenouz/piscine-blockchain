const { ethers } = require("ethers");
const crypto = require("crypto");

async function checkDocument(text, txID) {
  const Provider =
    ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;

  const provider = new Provider("http://localhost:8545");

  // Compute SHA-256 hash
  const hash =
    "0x" +
    crypto
      .createHash("sha256")
      .update(text)
      .digest("hex");

  // Get transaction
  const tx = await provider.getTransaction(txID);

  if (!tx) {
    return 0;
  }

  // Compare stored hash
  if (!tx.data || tx.data.toLowerCase() !== hash.toLowerCase()) {
    return 0;
  }

  // Transaction may not be mined yet
  if (!tx.blockNumber) {
    return 0;
  }

  // Get block
  const block = await provider.getBlock(tx.blockNumber);

  if (!block) {
    return 0;
  }

  return block.timestamp;
}

module.exports = checkDocument;