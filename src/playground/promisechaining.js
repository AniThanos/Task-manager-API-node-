require("../db/mongoose");
const User = require('../models/user');

// User.findByIdAndUpdate('5eb8d05c1b441d19a4e3bc50',{'age': 28}).then(user => {
//     console.log(user);
//     return User.countDocuments({"age": 28})
// }).then(count=>{
//     console.log(count)
// }).catch(e=>{
//     console.error(e);
// })


const updateAgeAndCount =async(id, age) => {
     const update = await User.findByIdAndUpdate(id,{age});
     const count = await User.countDocuments(age);
     return count;
}

updateAgeAndCount('5eb8d05c1b441d19a4e3bc50',27).then(count=>{
    console.log(count)
}).catch(e=>{
    console.error(e)
})