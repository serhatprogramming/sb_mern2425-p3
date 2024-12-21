const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectToDB = require("../utils/db");

// connectToTestingDB
connectToDB();

const api = supertest(app);

test("notes are returned as JSON", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
