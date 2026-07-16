const crypto = require('crypto');
const fs = require('fs');

const WALLET_FILE = 'wallet.pem';

function addressFromPublicKey(publicKey) {
  const publicKeyDer = publicKey.export({
    type: 'spki',
    format: 'der',
  });

  return '01' + crypto
    .createHash('sha256')
    .update(publicKeyDer)
    .digest('hex');
}

function generateAddress() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
  });

  fs.writeFileSync(WALLET_FILE, privateKey, {
    encoding: 'utf8',
    mode: 0o600,
  });

  return addressFromPublicKey(crypto.createPublicKey(publicKey));
}

function createTransaction(amount, recipient) {
  const privateKey = fs.readFileSync(WALLET_FILE, 'utf8');

  const publicKey = crypto.createPublicKey(privateKey);
  const sender = addressFromPublicKey(publicKey);

  const hexAmount = amount.toString(16);
  const transactionData = sender + recipient + hexAmount;

  const signature = crypto
    .sign('sha256', Buffer.from(transactionData), privateKey)
    .toString('hex');

  return transactionData + signature;
}