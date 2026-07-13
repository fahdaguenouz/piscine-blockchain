const { retrieveBlockDate } = require("./retrieve-block-date");

(async () => {
  try {
    const timestamp = await retrieveBlockDate(1881467);
    console.log("Timestamp:", timestamp);
  } catch (err) {
    console.error(err);
  }
})();