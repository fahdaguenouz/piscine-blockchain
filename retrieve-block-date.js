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
          const response = JSON.parse(data);

          if (response.error) {
            return reject(new Error(response.error.message));
          }

          resolve(response.result);
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
  const block = await rpc("getblock", [hash, 1]); 
  return block.time;
}

module.exports = { retrieveBlockDate };