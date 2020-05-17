require('../db/mongoose');
const Task = require("../models/task")

// Task.findByIdAndDelete('5eb8d0831b441d19a4e3bc51').then(task=>{
//     console.log(task)
//     return Task.countDocuments({"completed": false})
// }).then(task=>{
//     console.log(task)
// }).catch(e=>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const deleteTask= await Task.findByIdAndDelete(id);
    const count =await Task.countDocuments({completed:false})
    return count;
}

deleteTaskAndCount('5eb8dc240c25ca202c12d81b').then(count=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})