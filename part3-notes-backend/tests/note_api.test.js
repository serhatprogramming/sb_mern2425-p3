const { test, after, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectToDB = require("../utils/db");
const Note = require("../models/note");
const helper = require("./test_helper");

// connectToTestingDB
connectToDB();

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  let note = new Note(helper.initialNotes[0]);
  await note.save();
  note = new Note(helper.initialNotes[1]);
  await note.save();
});

test("notes are returned as JSON", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("two notes in the DB", async () => {
  const response = await api.get("/api/notes").expect(200);
  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test("first note is about HTTP", async () => {
  const { body } = await api.get("/api/notes");
  assert.strictEqual(body[0].content.includes("HTML"), true);
});

test("A valid note can be added", async () => {
  const note = {
    content: "async/await simplifies making async calls",
    important: true,
  };
  const newNote = await api
    .post("/api/notes")
    .send(note)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");
  const content = response.body.map((n) => n.content);
  assert.strictEqual(helper.initialNotes.length + 1, response.body.length);
  assert.strictEqual(
    content.includes("async/await simplifies making async calls"),
    true
  );
});

test("no content note cant be created", async () => {
  const newNote = { important: true };
  await api.post("/api/notes").send(newNote).expect(400);

  const response = await api.get("/api/notes");
  assert.strictEqual(helper.initialNotes.length, response.body.length);
});

after(async () => {
  await mongoose.connection.close();
});
