const reverse = (str) => {
  return str.split("").reverse().join("");
};

const ave = (arr) => {
  return arr.length !== 0
    ? arr.reduce((sum, item) => sum + item, 0) / arr.length
    : 0;
};

module.exports = { reverse, ave };
