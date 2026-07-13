const http = require("http");

function rpc(method, params = []) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: "1.0",
      id: "1",
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
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const response = JSON.parse(data);

          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.result);
          }
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function retrieveBlockDate(height) {
  const hash = await rpc("getblockhash", [height]);
  const block = await rpc("getblock", [hash]);
  return block.time;
}

module.exports = { retrieveBlockDate };