const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('../src/db/mongoose')

const userRoute = require('../src/routes/user');
const taskRouter = require('../src/routes/task');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(userRoute);
app.use(taskRouter);
app.use(cors());

module.exports = app;