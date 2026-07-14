const http = require("http");

const RPC_USER = "leeloo";
const RPC_PASSWORD = "multipass";
const RPC_HOST = "127.0.0.1";
const RPC_PORT = 18443;

function rpc(method, params = []) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: "1.0",
      id: "btc",
      method,
      params,
    });

    const options = {
      hostname: RPC_HOST,
      port: RPC_PORT,
      method: "POST",
      auth: `${RPC_USER}:${RPC_PASSWORD}`,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = http.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(body);

          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.result);
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function retrieveTransactionInOut(txHash) {
  if (typeof txHash !== "string" || txHash.length !== 64) {
    throw new Error("Invalid transaction hash");
  }

  const transaction = await rpc("getrawtransaction", [txHash, true]);

  const inputs = [];


  if (!(transaction.vin.length === 1 && transaction.vin[0].coinbase)) {
    for (const vin of transaction.vin) {
      const previousTx = await rpc("getrawtransaction", [vin.txid, true]);

      const previousOutput = previousTx.vout.find(
        (output) => output.n === vin.vout
      );

      inputs.push(previousOutput.value);
    }
  }

  const outputs = transaction.vout.map((output) => output.value);

  return {
    in: inputs,
    out: outputs,
  };
}

module.exports = {
  retrieveTransactionInOut,
};