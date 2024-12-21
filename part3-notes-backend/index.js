const app = require("./app");
const connectToDB = require("./utils/db");
const startServer = require("./utils/startServer");

connectToDB().then(() => {
  startServer(app);
});
