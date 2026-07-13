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
          "Content-Type": "text/plain",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let response = "";

        res.on("data", (chunk) => {
          response += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(response);

            if (json.error) {
              reject(new Error(json.error.message));
              return;
            }

            resolve(json.result);
          } catch (err) {
            reject(err);
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
  const blockHash = await rpc("getblockhash", [Number(height)]);
  const block = await rpc("getblock", [blockHash]);
  return Number(block.time);
}

module.exports = {
  retrieveBlockDate,
};