import crypto from "crypto";

export function hash160(input) {
  const ripemd = crypto
    .createHash("ripemd160")
    .update(input)
    .digest();

  return crypto
    .createHash("sha256")
    .update(ripemd)
    .digest();
}

export { hash160 };