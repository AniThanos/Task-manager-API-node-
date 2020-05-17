// const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
const {ObjectID,MongoClient} = require('mongodb');
const connectionUrl = "mongodb://localhost:27017";
const databaseName = "task-manager";
const users = require('./users.json');
MongoClient.connect(connectionUrl,{useNewUrlParser : true},(error,client) =>{
    if(error){
        return console.error("Connection Error")
    }
    const db=client.db(databaseName);
    // db.collection('users').insertOne({
    //     name:'Animesh',
    //     age:27
    // })
    // db.collection('users').insertMany(users,(error,result) => {
    //     if(error) return console.error("Insertion Failed")
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         "description" : "workout",
    //         "completed" : true
    //     },
    //     {
    //         "description" : "study",
    //         "completed" : true
    //     },{
    //         "description" : "gaming",
    //         "completed" : false
    //     }
    // ],(error,result) => {
    //     if(error) return console.log("Insertin Failed");
    //     console.log(result.ops)
    // })

    //=================read=================
    // db.collection('tasks').findOne({_id : new ObjectID("5eb47304bdaea30ef00a25ac")},(error,task) => {
    //     if(error) return console.error("Something went wrong")
    //     console.log(task)
    // })

    // db.collection('tasks').find({"completed" : true}).toArray((error,result) => {
    //     if(error) return console.error("Something Went wrong")
    //     console.log(result)
    // })

    //================update==================
    // db.collection('users').updateOne({
    //     _id : new ObjectID("5eb0d96bf061e71b444c05ed")
    // },{
    //     $set : {
    //         name : "Anil"
    //     },
    //     $inc : {
    //         age : 1
    //     }
    // }).then( (result) =>{
    //     console.log(result)
    // }).catch(error => {
    //     return console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     "completed" : true
    // },{
    //     $set : {
    //         "completed" : false
    //     }
    // }).then( result => {
    //     console.log(result)
    // }).catch( error => {
    //     return console.error(error)
    // })


    //====================delete=======================
    db.collection("tasks").deleteOne({
        "description" : "gaming"
    }).then ( result => {
        console.log(result)
    }).catch (error => {
        return console.log(error)
    })
})