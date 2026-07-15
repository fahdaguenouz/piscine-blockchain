const crypto = require('crypto');

function hash160(input) {
  const sha = crypto.createHash('sha256').update(input, 'utf8').digest();
  return crypto.createHash('ripemd160').update(sha).digest();
}