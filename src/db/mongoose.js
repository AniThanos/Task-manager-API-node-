const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false
}).then(()=>{
    console.log("MongoDB connected")
}).catch(e=>{
    console.log(e)
})

