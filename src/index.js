const express = require("express");
const app = express();
// const validate = require('validator');
//mongodb connect
require('../src/db/mongoose')
const User = require('../src/models/user');
const Task = require('../src/models/task');
const userRoute = require('../src/routes/user');
const taskRouter = require('../src/routes/task');


// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send("Get methods are disabled")
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//         res.status(503).send("Maintainance break")
// })



app.use(express.json());
app.use(userRoute);
app.use(taskRouter);




const PORT = process.env.PORT ||3001;

app.listen(PORT,()=>{
    console.log("connected at port",PORT)
})


const  main = async()=>{
    // const task= await Task.findById('5ec0ae5770b83425c0a0dc80');
    // await task.populate('owner').execPopulate();//populate owner all details
    // console.log(task.owner)

    // const user = await User.findById('5ec0ae2a70b83425c0a0dc7e')
    // await user.populate('tasks').execPopulate(); //populate tasks of particular user
    // console.log(user.tasks) 
}
main();