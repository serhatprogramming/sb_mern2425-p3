const ave = require("../utils/for_testing").ave;

const { test, describe } = require("node:test");
const assert = require("node:assert");

describe("average", () => {
  test("of one value the value itself", () => {
    assert.strictEqual(ave([5]), 5);
  });

  test("many values calculated right", () => {
    assert.strictEqual(ave([1, 2, 3, 4, 5]), 3);
  });

  test("empty array should return 0", () => {
    assert.strictEqual(ave([]), 0);
  });
});
