const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Task = require("../models/task");

//new task create
router.post("/tasks", auth,async (req,res) => {
    const task = new Task({
        ...req.body,
        owner : req.user._id   
    });
    try{
        await task.save();
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//read task with/without filters provided as query params 
//get /tasks/completed=true
//GET /tasks/limit=1&skip=1
//GET /tasks/sortBy=createdAt:desc
router.get("/tasks", auth,async(req, res) => {
    try{
        const match = {};
        const sort = {};

        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }
        
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc'? -1 : 1; 
        }
        
        
        //either methods will work
        //const tasks = await Task.find({owner:req.user._id})
        //res.send(tasks)
        
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks)
    }catch(e){
        res.status(501).send(e)
    }
})


//read task  by id
router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try{
        const task= await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(400).send("No task found")
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
    
})


//update Task
router.patch("/tasks/:id",auth,async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedupdates = ["description","completed"];
    const isValidUpdate = updates.every(update => allowedupdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send("invalid Updates")
    }
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        if(!task){
           return res.status(404).send()
        }
        updates.forEach(update=>task[update]=req.body[update]);
        await task.save();
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete Task
router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;