const fs = require("fs").promises;
const crypto = require("crypto");

async function hashFile(fpath) {
  const data = await fs.readFile(fpath);

  return crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
}

exports.hashFile = hashFile;