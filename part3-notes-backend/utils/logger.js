const info = (...params) => {
  console.log("[INFO]", ...params);
};

const error = (...params) => {
  console.error("[ERROR]", ...params);
};

const debug = (...params) => {
  console.log("[DEBUG]", ...params);
};

module.exports = { info, error, debug };
