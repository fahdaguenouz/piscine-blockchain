const { generateKeyPairSync: g, createHash: h } = require("crypto");
exports.generateAddress = () => {
  const { k: p } = g("ec", {
      namedCurve: "secp256k1",
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "pem" },
    }),
    { k: u } = g("ec", {
      namedCurve: "secp256k1",
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "der" },
    });
  return {
    privateKey: p,
    publicKey: u,
    address: "01" + h("sha256").update(u).digest("hex"),
  };
};