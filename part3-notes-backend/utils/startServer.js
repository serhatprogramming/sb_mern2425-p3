const logger = require("./logger");
const config = require("./config");

const startServer = (app) => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

module.exports = startServer;
