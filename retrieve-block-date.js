const axios = require("axios");

async function rpc(method, params = []) {
  const { data } = await axios.post(
    "http://localhost:18443",
    {
      jsonrpc: "1.0",
      id: "1",
      method,
      params,
    },
    {
      auth: {
        username: "leeloo",
        password: "multipass",
      },
    }
  );

  return data.result;
}

async function retrieveBlockDate(height) {
  const hash = await rpc("getblockhash", [height]);
  const block = await rpc("getblock", [hash]);
  return block.time;
}

module.exports = { retrieveBlockDate };