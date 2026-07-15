const crypto = require("crypto");

function hash160(input) {
  const ripemd = crypto
    .createHash("ripemd160")
    .update(input)
    .digest();

  return crypto
    .createHash("sha256")
    .update(ripemd)
    .digest();
}

exports.hash160 = hash160;