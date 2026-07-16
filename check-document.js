const { ethers } = require("ethers");
const crypto = require("crypto");

async function checkDocument(text, txID) {
  const Provider =
    ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;

  const provider = new Provider("http://localhost:8545");

  // Validate transaction hash
  const isHexString =
    (ethers.isHexString || (ethers.utils && ethers.utils.isHexString));

  if (
    typeof txID !== "string" ||
    !isHexString(txID, 32)
  ) {
    return 0;
  }

  // Compute SHA-256 hash
  const hash =
    "0x" +
    crypto.createHash("sha256").update(text).digest("hex");

  let tx;

  try {
    tx = await provider.getTransaction(txID);
  } catch (e) {
    return 0;
  }

  if (!tx) {
    return 0;
  }

  if (!tx.data || tx.data.toLowerCase() !== hash.toLowerCase()) {
    return 0;
  }

  if (!tx.blockNumber) {
    return 0;
  }

  const block = await provider.getBlock(tx.blockNumber);

  return block ? block.timestamp : 0;
}

module.exports = checkDocument;

