const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require('../middleware/auth');

//new user create
router.post('/users',async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateToken()
        res.status(201).send({user,token});
    }catch(e){
        res.status(400).send(e)
    }     
})

//read profile
router.get('/users/me',auth,async (req, res) => {
    res.send(req.user);
})

//read users by id
router.get('/users/:id',async (req, res) =>{
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(400).send("NO User Found")
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

//update users
router.patch("/users/me", auth ,async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdated = ["name","email","password","age"]
    const isAllowedUpdate = updates.every(update => allowedUpdated.includes(update));
    if(!isAllowedUpdate){
        return res.status(400).send("Invalid Update")
    }
    try{
        updates.map(update => req.user[update]=req.body[update])
        await req.user.save()        
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete User
router.delete("/users/me",auth ,async(req,res)=>{
    try{
        await User.remove(req.user)
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
   
})

//user login
router.post('/users/login',async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateToken();
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

//user logout
router.post('/users/logout', auth ,async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(400).send()
    }
})

//user logout all
router.post('/users/logoutAll', auth ,async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

module.exports  = router