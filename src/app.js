const express = require("express");
const app = express();

require('../src/db/mongoose')

const userRoute = require('../src/routes/user');
const taskRouter = require('../src/routes/task');

app.use(express.json());
app.use(userRoute);
app.use(taskRouter);

module.exports = app;