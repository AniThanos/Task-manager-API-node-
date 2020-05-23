const mongoose = require('mongoose');
const User = require('../../src/models/user');
const jwt = require('jsonwebtoken');
const Task = require('../../src/models/task')


const userOneID = new mongoose.Types.ObjectId();
const userOne = {
    '_id' : userOneID,
    'name':'Ram',
    'email':'ram@gmail.com',
    'password':'ramram123',
    'tokens' : [{
        'token' : jwt.sign({'id':userOneID},process.env.JWT_TOKEN)
    }]
}


const userTwoID = new mongoose.Types.ObjectId();
const userTwo = {
    '_id' : userTwoID,
    'name':'Ani',
    'email':'ani@gmail.com',
    'password':'aniani123',
    'tokens' : [{
        'token' : jwt.sign({'id':userTwoID},process.env.JWT_TOKEN)
    }]
}

const taskOne = {
    _id : new mongoose.Types.ObjectId(),
    description : "task one",
    completed : false,
    owner : userOne._id
} 

const taskTwo = {
    _id : new mongoose.Types.ObjectId(),
    description : "task Two",
    completed : true,
    owner : userOne._id
} 

const taskThree = {
    _id : new mongoose.Types.ObjectId(),
    description : "task Three",
    completed : true,
    owner : userTwo._id
} 

const setupDatabase = async() => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    setupDatabase,userOne,userOneID,userTwo,userOneID,taskOne,taskTwo,taskThree
}