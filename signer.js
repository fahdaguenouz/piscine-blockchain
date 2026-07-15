const crypto = require("crypto");

let privateKey;
let publicKey;

// Generates an EC key pair and returns the public key
function init() {
  const keyPair = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1", // Common curve used in blockchain
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  privateKey = keyPair.privateKey;
  publicKey = keyPair.publicKey;

  return publicKey;
}

// Signs a message using SHA-256
function signer(message) {
  const sign = crypto.createSign("sha256");
  sign.update(message);
  sign.end();

  return sign.sign(privateKey, "hex");
}

// Verifies a signature using the provided public key
function verifier(message, pubKey, signature) {
  try {
    const verify = crypto.createVerify("sha256");
    verify.update(message);
    verify.end();

    return verify.verify(pubKey, signature, "hex");
  } catch {
    return false;
  }
}

