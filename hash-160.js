const crypto = require('crypto');

function hash160(input) {
  const ripemd160 = crypto.createHash('ripemd160').update(input).digest();
  const sha256 = crypto.createHash('sha256').update(ripemd160).digest();
  return sha256;
}