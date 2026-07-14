const http = require("http");

function rpc(method, params = []) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: "1.0",
      id: "curltest",
      method,
      params,
    });

    const req = http.request(
      {
        hostname: "localhost",
        port: 18443,
        method: "POST",
        auth: "leeloo:multipass",
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));

        res.on("end", () => {
          console.log("RAW:", data);

          const response = JSON.parse(data);

          if (response.error) {
            console.log("RPC ERROR:", response.error);
            reject(new Error(JSON.stringify(response.error)));
            return;
          }

          resolve(response.result);
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    console.log(body);
    req.end();
  });
}

async function retrieveBlockDate(height) {
const hash = await rpc("getblockhash", [Number(height)]);
  console.log("hash:", hash, typeof hash);

  const block = await rpc("getblock", [hash, 1]);
  console.log("block.time:", block.time, typeof block.time);

  return Number(block.time);
}
module.exports = { retrieveBlockDate };