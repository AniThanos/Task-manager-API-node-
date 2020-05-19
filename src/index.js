const express = require("express");
const app = express();
// const validate = require('validator');
//mongodb connect
require('../src/db/mongoose')
const User = require('../src/models/user');
const Task = require('../src/models/task');
const userRoute = require('../src/routes/user');
const taskRouter = require('../src/routes/task');

app.use(express.json());
app.use(userRoute);
app.use(taskRouter);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("connected at port",PORT)
})

