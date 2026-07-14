function increment(hex) {
  const bytes = Array.from(Buffer.from(hex, "hex"));

  let carry = 1;

  for (let i = bytes.length - 1; i >= 0 && carry; i--) {
    bytes[i] += carry;

    if (bytes[i] > 0xff) {
      bytes[i] = 0x00;
      carry = 1;
    } else {
      carry = 0;
    }
  }

 
  if (carry) {
    bytes.unshift(0x01);
  }

  return Buffer.from(bytes);
}
