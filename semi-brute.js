const crypto = require('crypto');

function semiBrute(target) {
  let i = 0;

  while (true) {
    const candidate = String(i);
    const hash = crypto
      .createHash('sha256')
      .update(candidate, 'utf8')
      .digest('hex');

    if (hash.startsWith(target)) {
      return candidate;
    }

    i++;
  }
}