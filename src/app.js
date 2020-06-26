const express = require("express");
const app = express();
const cors = require('cors');
require('../src/db/mongoose')

const userRoute = require('../src/routes/user');
const taskRouter = require('../src/routes/task');

app.use(express.json());
app.use(userRoute);
app.use(taskRouter);
app.use(cors());

module.exports = app;