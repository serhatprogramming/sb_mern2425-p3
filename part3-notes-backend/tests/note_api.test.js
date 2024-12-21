const { test, after, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectToDB = require("../utils/db");
const Note = require("../models/note");

// connectToTestingDB
connectToDB();
const initialNotes = [
  { content: "HTML is easy", important: true },
  { content: "CSS is tricky", important: false },
];

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  let note = new Note(initialNotes[0]);
  await note.save();
  note = new Note(initialNotes[1]);
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
  assert.strictEqual(response.body.length, initialNotes.length);
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
  assert.strictEqual(initialNotes.length + 1, response.body.length);
  assert.strictEqual(
    content.includes("async/await simplifies making async calls"),
    true
  );
});

after(async () => {
  await mongoose.connection.close();
});
