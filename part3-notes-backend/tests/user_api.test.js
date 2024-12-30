const bcrypt = require("bcrypt");
const User = require("../models/user");

const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectToDB = require("../utils/db");
const helper = require("./test_helper");

connectToDB();
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("pass123", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "bcauser",
      name: "bca hackensack",
      password: "salty123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    console.log("users after bcauser: ", usersAtEnd);
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });
  test("should creation with same username fail", async () => {
    const usersAtStart = await helper.usersInDb();

    console.log(usersAtStart);

    const result = await api
      .post("/api/users")
      .send({ username: "root", password: "2224444" })
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
