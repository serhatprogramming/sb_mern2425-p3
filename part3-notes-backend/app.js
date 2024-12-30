const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
