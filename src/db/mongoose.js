const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/task-manager-api",{
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false
}).then(()=>{
    console.log("MongoDB connected")
}).catch(e=>{
    console.log(e)
})

