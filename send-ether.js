const { ethers } = require("ethers");

async function sendEther(amount, address) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const signer = provider.getSigner(0);

  const tx = await signer.sendTransaction({
    to: address,
    value: ethers.utils.parseEther(amount.toString()),
  });

  return tx.hash;
}

module.exports = sendEther;