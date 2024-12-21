const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./config");

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    logger.info("connecting to DB...");
    await mongoose.connect(config.MONGODB_URI);
    logger.info("connected to DB");
  } catch (error) {
    logger.error("error connecting to DB", error.message);
    process.exit(1); // Exit the process if the DB connection fails
  }
};

module.exports = connectToDB;
